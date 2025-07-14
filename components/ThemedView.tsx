import {  type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Layout } from '@ui-kitten/components';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <Layout style={[{ backgroundColor }, style]} {...otherProps} />;
}
