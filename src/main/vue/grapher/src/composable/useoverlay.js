const subscribersOnShow = [];
const subscribersOnHide = [];

function useOverlay() {
  return {
    show: () => {
      subscribersOnShow.forEach(fn => fn());
    },
    hide: () => {
      subscribersOnHide.forEach(fn => fn());
    },
    subscribeOnShow: (fn) => {
      subscribersOnShow.push(fn);
    },
    subscribeOnHide: (fn) => {
      subscribersOnHide.push(fn);
    },
  }
}

export { useOverlay };
