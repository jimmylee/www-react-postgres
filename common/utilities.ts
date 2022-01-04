declare const window: any;

const hasOwn = {}.hasOwnProperty;

export async function getWalletStatus() {
  const isMetamaskEnabled =
    typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
  const isPhantomEnabled =
    typeof window.solana !== "undefined" && window.solana.isPhantom;

  // NOTE(jim): This allows you to get the public key.
  if (isPhantomEnabled && !window.solana.publicKey) {
    try {
      await window.solana.connect({ onlyIfTrusted: true });
    } catch (e) {
      console.log(e);
    }
  }

  return { isMetamaskEnabled, isPhantomEnabled };
}

export function classNames(...args: any[]): string {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        var inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(" ");
}
