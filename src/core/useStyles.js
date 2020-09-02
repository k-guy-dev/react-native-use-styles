import { useMemo, useCallback } from "react";
import { globalUse } from "./stylesPath";
import { getPathFromLiteralTag } from "./utils";

export default (nameSpace) => {
  // create local cache for returned arrays, so we can avoid re-renders and re-transformations
  const localCache = useMemo(() => Object.create(null), []);

  return useCallback((strings, ...expressions) => {
    const path = getPathFromLiteralTag(strings, expressions);

    if (localCache[path]) {
      return localCache[path];
    }

    const styles = globalUse(path, nameSpace);
    Object.assign(localCache, { [path]: styles });

    return styles;
  }, []);
};
