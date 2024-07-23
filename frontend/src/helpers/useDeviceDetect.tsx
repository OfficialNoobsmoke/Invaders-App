import { useMemo } from "react";
import {
  fullBrowserVersion,
  isAndroid,
  isChrome,
  isChromium,
  isDesktop,
  isEdge,
  isFirefox,
  isIE,
  isIOS,
  isMacOs,
  isMobile,
  isMobileSafari,
  isOpera,
  isSafari,
  isSamsungBrowser,
  isTablet,
  isWindows,
} from "react-device-detect";

export const useDeviceDetect = () => {
  const browser = useMemo(() => {
    if (isChrome) {
      return "chrome";
    }
    if (isChromium) {
      return "chromium";
    }
    if (isFirefox) {
      return "firefox";
    }
    if (isSafari) {
      return "safari";
    }
    if (isOpera) {
      return "opera";
    }
    if (isEdge) {
      return "edge";
    }
    if (isIE) {
      return "internet-explorer";
    }
    if (isMobileSafari) {
      return "mobile-safari";
    }
    if (isSamsungBrowser) {
      return "samsung-browser";
    }
    return "unknown";
  }, []);

  const platform = useMemo(() => {
    if (isWindows) {
      return "windows";
    }
    if (isMacOs) {
      return "mac";
    }
    if (isAndroid) {
      return "android";
    }
    if (isIOS) {
      return "ios";
    }
    return "unknown";
  }, []);

  const resolution = useMemo(() => {
    if (isDesktop) {
      return "desktop";
    }
    if (isMobile) {
      return "mobile";
    }
    if (isTablet) {
      return "tablet";
    }

    return "unknown";
  }, []);

  return { browser, platform, resolution, fullBrowserVersion };
};
