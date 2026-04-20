/**
 * Generate timestamped report path
 * Every test run creates a new folder to avoid overwriting reports
 */

import * as path from 'path';
import * as fs from 'fs';

/**
 * Generate timestamped report path
 * Format: test-results/YYYY-MM-DD_HH-MM-SS
 */
export function getReportPath(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  const reportPath = path.join(process.cwd(), 'test-results', timestamp);

  // Create directory if it doesn't exist
  if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath, { recursive: true });
    console.log(`📁 Created report directory: ${reportPath}`);
  }

  return reportPath;
}

/**
 * Get latest report path
 */
export function getLatestReportPath(): string | null {
  const resultsDir = path.join(process.cwd(), 'test-results');

  if (!fs.existsSync(resultsDir)) {
    return null;
  }

  const directories = fs
    .readdirSync(resultsDir)
    .filter((file) => {
      const filePath = path.join(resultsDir, file);
      return fs.statSync(filePath).isDirectory();
    })
    .sort()
    .reverse();

  if (directories.length === 0) {
    return null;
  }

  return path.join(resultsDir, directories[0]);
}

/**
 * Clean old report directories (keep last N)
 */
export function cleanOldReports(keepLast: number = 10): void {
  const resultsDir = path.join(process.cwd(), 'test-results');

  if (!fs.existsSync(resultsDir)) {
    return;
  }

  const directories = fs
    .readdirSync(resultsDir)
    .filter((file) => {
      const filePath = path.join(resultsDir, file);
      return fs.statSync(filePath).isDirectory();
    })
    .sort()
    .reverse();

  // Remove old directories
  if (directories.length > keepLast) {
    const toDelete = directories.slice(keepLast);
    for (const dir of toDelete) {
      const dirPath = path.join(resultsDir, dir);
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`🗑️  Deleted old report directory: ${dirPath}`);
    }
  }
}

/**
 * Get report statistics
 */
export function getReportStats(): { totalReports: number; totalSize: number } {
  const resultsDir = path.join(process.cwd(), 'test-results');

  if (!fs.existsSync(resultsDir)) {
    return { totalReports: 0, totalSize: 0 };
  }

  const directories = fs
    .readdirSync(resultsDir)
    .filter((file) => {
      const filePath = path.join(resultsDir, file);
      return fs.statSync(filePath).isDirectory();
    });

  let totalSize = 0;
  for (const dir of directories) {
    const dirPath = path.join(resultsDir, dir);
    const stats = fs.statSync(dirPath);
    totalSize += stats.size;
  }

  return {
    totalReports: directories.length,
    totalSize,
  };
}
