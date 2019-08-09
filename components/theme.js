import base from '@rebass/preset'

export const breakpoints = [32, 48, 64].map(w => `${w}em`)

export const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]

export const fontSizes = [12, 16, 20, 24, 32, 48, 64, 96, 128]

export const palette = {
  darker: '#121217',
  dark: '#17171d',
  darkless: '#252429',
  black: '#1f2d3d',
  steel: '#273444',
  slate: '#3c4858',
  muted: '#8492a6',
  smoke: '#e0e6ed',
  snow: '#f9fafc',
  white: '#ffffff',
  red: '#ec3750',
  orange: '#ff8c37',
  yellow: '#f1c40f',
  green: '#33d6a6',
  cyan: '#5bc0de',
  blue: '#338eda',
  twitter: '#1da1f2',
  facebook: '#3b5998',
  instagram: '#e1306c'
}

const theme = {
  ...base,
  breakpoints,
  space,
  fontSizes,
  colors: {
    ...palette,
    text: palette.black,
    background: palette.white,
    primary: palette.red,
    secondary: '#30c',
    muted: palette.muted,
    accent: palette.green,
    dem: palette.blue,
    rep: palette.red,
    ind: palette.cyan,
    lib: palette.orange,
    gre: palette.green
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700
  },
  letterSpacings: {
    heading: '-0.05em',
    caps: '0.1em'
  },
  sizes: {
    container: 768
  },
  radii: {
    default: 6,
    extra: 9,
    circle: 99999
  },
  shadows: {
    card: '0 4px 8px rgba(0, 0, 0, 0.125)'
  },
  text: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      letterSpacing: 'heading'
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      letterSpacing: 'heading',
      fontSize: [5, 6, 7]
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: 'caps'
    }
  },
  styles: base.styles,
  variants: {
    container: {
      width: '100%',
      maxWidth: 'container',
      mx: 'auto',
      px: 2
    },
    card: {
      bg: 'white',
      p: [3, 4],
      borderRadius: 'extra',
      boxShadow: 'card'
    },
    avatar: {
      borderRadius: 'circle',
      objectFit: 'cover',
      objectPosition: 'center',
      flexShrink: 0
    }
  }
}
theme.styles.root = {
  fontFamily: theme.fonts.body,
  lineHeight: theme.lineHeights.body,
  fontWeight: theme.fontWeights.body,
  margin: 0,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}

export default theme
