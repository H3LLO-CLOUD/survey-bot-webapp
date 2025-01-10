import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";
import eslintPluginReadableTailwind from "eslint-plugin-readable-tailwind";
import eslintParserTypeScript from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ["**/*.{ts,tsx,cts,mts}"],
        languageOptions: {
            parser: eslintParserTypeScript,
            parserOptions: {
                project: true
            }
        }
    },
    {
        files: ["**/*.{jsx,tsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            "readable-tailwind": eslintPluginReadableTailwind
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off", // Disable the no-explicit-any rule
            ...eslintPluginReadableTailwind.configs.warning.rules,
        },
    },
];

export default eslintConfig;
