import {execSync} from 'child_process';
import {promises as fs} from 'fs';
import path from 'path';

const ICONS_DIR = path.resolve('src/shared/icons');
const OUT_FILE = path.join(ICONS_DIR, 'index.ts');
const PRESERVE_ORIGINAL_COLOR_ICON_FILES = new Set([
  'ic-checkbox-checked.tsx',
  'ic-chevron-down-sm.tsx',
  'ic-coupon.tsx',
  'ic-delivery.tsx',
  'ic-star.tsx',
  'ic-tag-membership-sm.tsx',
]);

const ICON_EXPORT_ORDER = [
  'ic-arrow-left.tsx',
  'ic-cart.tsx',
  'ic-checkbox-checked.tsx',
  'ic-checkbox-off.tsx',
  'ic-checkbox-on.tsx',
  'ic-checkbox-un-checked.tsx',
  'ic-check-lg.tsx',
  'ic-check-sm.tsx',
  'ic-check-sm-checked.tsx',
  'ic-chevron-down.tsx',
  'ic-chevron-down-sm.tsx',
  'ic-chevron-right.tsx',
  'ic-chevron-right-sm.tsx',
  'ic-close.tsx',
  'ic-close-sm.tsx',
  'ic-coupon.tsx',
  'ic-delete.tsx',
  'ic-delivery.tsx',
  'ic-map.tsx',
  'ic-menu.tsx',
  'ic-minus.tsx',
  'ic-notice.tsx',
  'ic-plus.tsx',
  'ic-question.tsx',
  'ic-search.tsx',
  'ic-star.tsx',
  'ic-subtract-n.tsx',
  'ic-tag-delivery.tsx',
  'ic-tag-membership-sm.tsx',
  'ic-tag-pay.tsx',
];

function toPascalCase(name: string): string {
  const pascalName = getIconName(name)
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  return `IcSvg${pascalName}`;
}

function toSnakeCaseFileName(name: string): string {
  const snakeName = getIconName(name)
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map((s) => s.toLowerCase())
    .join('-');
  return `ic-${snakeName}.tsx`;
}

function getIconName(name: string): string {
  return name.replace(/\.[^.]+$/, '').replace(/^Ic(?=[A-Z])/, '');
}

function getIconExportOrder(fileName: string): number {
  const index = ICON_EXPORT_ORDER.indexOf(fileName);

  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function sortIconFiles(a: string, b: string): number {
  const fileNameA = toSnakeCaseFileName(a);
  const fileNameB = toSnakeCaseFileName(b);
  const orderDiff =
    getIconExportOrder(fileNameA) - getIconExportOrder(fileNameB);

  if (orderDiff !== 0) {
    return orderDiff;
  }

  return fileNameA.localeCompare(fileNameB);
}

function applyIconSpecificColorRules(fileName: string, content: string) {
  if (
    fileName === 'ic-checkbox-checked.tsx' ||
    fileName === 'ic-coupon.tsx' ||
    fileName === 'ic-delivery.tsx'
  ) {
    return content.replace(/fill=['"]#fff['"]/g, "fill='white'");
  }

  if (fileName === 'ic-tag-membership-sm.tsx') {
    return content
      .replace(
        /<path fill=['"]#fff['"] d=['"]M0 0h47v14H0z['"] \/>/,
        "<path fill='#none' d='M0 0h47v14H0z' />"
      )
      .replace(
        /(<clipPath id=['"]tag-membership-sm_svg__a['"]>\s*)<path fill=['"]#fff['"] d=['"]M0 0h47v14H0z['"] \/>/,
        "$1<path fill='currentColor' d='M0 0h47v14H0z' />"
      );
  }

  return content;
}

async function main() {
  try {
    await fs.rm(ICONS_DIR, {recursive: true, force: true});
    await fs.mkdir(ICONS_DIR, {recursive: true});

    const svgrCommand = `pnpm exec svgr src/shared/assets/svg --out-dir ${ICONS_DIR} --ext tsx --typescript --no-dimensions --icon --no-index --jsx-runtime automatic --no-prettier`;
    execSync(svgrCommand, {stdio: 'inherit'});

    const generatedFiles = (await fs.readdir(ICONS_DIR))
      .filter((f) => f.endsWith('.tsx') && !f.startsWith('index'))
      .sort(sortIconFiles);

    const exportLines = [
      '// (auto-generated) Do not edit manually.',
      '// Run `pnpm build:icons` to regenerate.\n',
    ];

    for (const file of generatedFiles) {
      const oldPath = path.join(ICONS_DIR, file);
      const newFileName = toSnakeCaseFileName(file);
      const newPath = path.join(ICONS_DIR, newFileName);
      const componentName = toPascalCase(file);

      await fs.rename(oldPath, newPath);

      let content = await fs.readFile(newPath, 'utf8');

      if (!PRESERVE_ORIGINAL_COLOR_ICON_FILES.has(newFileName)) {
        content = content.replace(
          /(stroke)=['"]([^'"]+)['"]/g,
          (_match, p1) => `${p1}="currentColor"`
        );

        content = content.replace(
          /(<path[^>]*?|<g[^>]*?)fill=['"]([^'"]+?)['"]/g,
          (match, p1, p2) => {
            if (
              p2 === 'none' ||
              p2 === 'transparent' ||
              p2.startsWith('url(')
            ) {
              return match;
            }
            return `${p1}fill="currentColor"`;
          }
        );
      }

      content = content.replace(/^import \* as React from 'react';\r?\n/m, '');

      content = content.replace(/const Svg[^ ]+ =/, `const ${componentName} =`);
      content = content.replace(
        /export default Svg[^;]+;/,
        `export default ${componentName};`
      );

      content = applyIconSpecificColorRules(newFileName, content);

      const importMatch = content.match(
        /^(import type \{ SVGProps \} from 'react';\r?\n)/m
      );
      if (importMatch) {
        if (!content.startsWith(`${importMatch[0]}\n`)) {
          content = content.replace(importMatch[0], `${importMatch[0]}\n`);
        }
      }

      await fs.writeFile(newPath, content);

      exportLines.push(
        `export { default as ${componentName} } from './${newFileName.replace('.tsx', '')}';`
      );
    }

    exportLines.push('');
    await fs.writeFile(OUT_FILE, exportLines.join('\n'), 'utf8');

    execSync(`pnpm exec prettier ${ICONS_DIR} --write`, {stdio: 'inherit'});
  } catch (error) {
    console.error('An error occurred during icon build process:', error);
    process.exit(1);
  }
}

main();