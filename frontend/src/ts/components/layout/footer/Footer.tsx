import { JSXElement } from "solid-js";

import { getIsScreenshotting } from "../../../states/core";
import { isFocusMode } from "../../../states/test";
import { cn } from "../../../utils/cn";
import { Button } from "../../common/Button";
import { isLoadingShown } from "../../core/PageSwitcher";
import { Keytips } from "./Keytips";
import { ThemeIndicator } from "./ThemeIndicator";

export function Footer(): JSXElement {
  return (
    <footer
      class={cn("relative text-xs text-sub", {
        "opacity-0": getIsScreenshotting(),
      })}
      data-focused={isFocusMode() ? "" : undefined}
      inert={isLoadingShown()}
    >
      <Keytips />

      <div
        class={cn("-m-2 flex justify-between gap-8 transition-opacity", {
          "opacity-0": isFocusMode(),
        })}
      >
        <div class="grid grid-cols-1 justify-items-start xs:grid-cols-2 sm:grid-cols-4 lg:flex">
          <Button
            variant="text"
            text="binolabs"
            fa={{
              icon: "fa-home",
              fixedWidth: true,
            }}
            href="https://binolabs.com/"
          />
          <Button
            variant="text"
            text="source"
            fa={{
              icon: "fa-code",
              fixedWidth: true,
            }}
            href="https://github.com/mabino/monkeytype/tree/binolabs"
          />
          <Button
            variant="text"
            text="based on monkeytype"
            fa={{
              icon: "fa-heart",
              fixedWidth: true,
            }}
            href="https://github.com/monkeytypegame/monkeytype"
          />
          <Button
            variant="text"
            text="license (gpl-3.0)"
            fa={{
              icon: "fa-file-contract",
              fixedWidth: true,
            }}
            href="https://github.com/mabino/monkeytype/blob/binolabs/NOTICE.md"
          />
        </div>
        <div class="flex flex-col items-end text-right lg:flex-row">
          <ThemeIndicator />
        </div>
      </div>
    </footer>
  );
}
