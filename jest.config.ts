import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/Pruebas unitarias', '<rootDir>/src'],
	testMatch: ['**/?(*.)+(spec|test).ts'],
	moduleFileExtensions: ['ts', 'js', 'json'],
	moduleNameMapper: {
		'^(.*)\\.js$': '$1',
	},
	clearMocks: true,
	coverageDirectory: 'coverage',
	collectCoverageFrom: [
		'src/**/*.{ts,js}',
		'!src/infrastructure/web/**',
		'!src/infrastructure/server.ts',
		'!src/infrastructure/boostrap/**',
	],
};

export default config;
