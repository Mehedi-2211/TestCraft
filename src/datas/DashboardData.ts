// Dashboard Data - Static test data for dashboard feature
export class DashboardData {
  static readonly statCards = {
    totalDevices: 'Total Devices',
    enrolledDevices: 'Enrolled Devices',
    onlineDevices: 'Devices Online',
    alerts: 'Alerts',
  };

  static readonly chartTypes = {
    battery: 'Battery Status',
    network: 'Network Status',
    storage: 'Storage Usage',
  };

  static readonly menuItems = {
    dashboard: 'Dashboard',
    devices: 'Devices',
    users: 'Users',
    settings: 'Settings',
    reports: 'Reports',
  };

  static readonly timeRanges = {
    last24Hours: 'Last 24 Hours',
    last7Days: 'Last 7 Days',
    last30Days: 'Last 30 Days',
    last90Days: 'Last 90 Days',
  };

  static readonly validationPatterns = {
    numberFormat: /^[\d,]+$/,
    percentage: /^\d+%/,
    timestamp: /\d+\s(minutes|hours|days)\sago/,
  };
}
