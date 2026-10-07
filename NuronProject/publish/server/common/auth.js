const sessionRoutes = [
  { path: '/api/login', method: 'POST' },
  { path: '/api/finalize', method: 'POST' }
];

const refreshRoutes = [
  { path: '/user/profile', method: 'POST' }
];

const authRoutes = [
  // Notification routes.
  { path: '/notification/delete', method: 'POST' },
  { path: '/notification/query', method: 'POST' },

  // User routes.
  { path: '/user/username', method: 'POST' },
  { path: '/user/get', method: 'POST' },

  { path: '/user/password', method: 'POST' },
  { path: '/user/email', method: 'POST' },
  { path: '/user/settings', method: 'POST' },
  { path: '/user/profile', method: 'POST' },
  { path: '/user/report', method: 'POST' },
  { path: '/user/soft-delete', method: 'POST' },
  { path: '/user/hard-delete', method: 'POST' },

  // Client routes.
  { path: '/client/generate', method: 'POST' },
  { path: '/client/codes', method: 'POST' },
  { path: '/client/revoke', method: 'POST' },

  // Assembly routes.
  { path: '/assembly/save', method: 'POST' },
  { path: '/assembly/hashes', method: 'POST' },
  { path: '/assembly/delete', method: 'POST' },
  { path: '/assembly/get', method: 'POST' },
  { path: '/assembly/query', method: 'POST' },
  { path: '/assembly/copy', method: 'POST' },
  { path: '/assembly/stats', method: 'POST' },
  { path: '/assembly/like', method: 'POST' },
  { path: '/assembly/download', method: 'POST' },
];

const checkNewSession = (httpMethod, url) => {
  for (let routeObj of sessionRoutes) {
    if (routeObj.method === httpMethod && routeObj.path === url) {
      return true;
    }
  }
  return false;
}

const checkRefreshSession = (httpMethod, url) => {
  for (let routeObj of refreshRoutes) {
    if (routeObj.method === httpMethod && routeObj.path === url) {
      return true;
    }
  }
  return false;
}

const checkExpiredSession = (url) => {
  return !!url && url.includes('logout');
}

const checkAuthSession = (httpMethod, url) => {
  for (let routeObj of authRoutes) {
    if (routeObj.method === httpMethod && routeObj.path === url) {
      return true;
    }
  }
  return false;
}

module.exports = {
    checkNewSession,
    checkRefreshSession,
    checkExpiredSession,
    checkAuthSession
}