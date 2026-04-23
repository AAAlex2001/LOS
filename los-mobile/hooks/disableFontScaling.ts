import { Text, TextInput } from 'react-native';

const globalKey = '__LOS_FONTS_PATCHED__';
const g = globalThis as typeof globalThis & { [key: string]: boolean | undefined };

type Patchable = {
  render?: (...args: any[]) => any;
  defaultProps?: Record<string, unknown>;
};

function patch(component: unknown) {
  const c = component as Patchable;

  if (typeof c.render === 'function') {
    const original = c.render;
    c.render = (props: Record<string, unknown>, ...rest: any[]) =>
      original(
        {
          ...props,
          allowFontScaling: false,
          maxFontSizeMultiplier: 1,
        },
        ...rest
      );
  }

  c.defaultProps = c.defaultProps || {};
  c.defaultProps.allowFontScaling = false;
  c.defaultProps.maxFontSizeMultiplier = 1;
}

if (!g[globalKey]) {
  patch(Text);
  patch(TextInput);
  g[globalKey] = true;
}
