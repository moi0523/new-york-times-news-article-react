import * as React from 'react';
import { FunctionComponent } from 'react';
import { StyleObject } from 'styletron-react';

type StyleOverride<Props> =
  | StyleObject
  | ((props: { $theme: any } & React.PropsWithChildren<Props>) => StyleObject);

interface OverrideObject<Props> {
  component?: FunctionComponent<OverrideObject<Props>>;
  props?: Props;
  style?: StyleOverride<Props>;
}
