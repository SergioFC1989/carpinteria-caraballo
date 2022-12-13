import { grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

const CustomTheme = deepMerge(grommet, {
  global: {
    colors: {
      text: '#000000',
      brand: '#60DCA7',
      dark: '#1D1D1D',
      'dark-grey': '#656565',
      'regular-grey': '#B4B4B4',
      'medium-grey': '#9B9B9B',
      'light-grey': '#E4E4E4',
      'status-error': '#DF5539',
    },
    breakpoints: {
      small: {
        value: 360,
        edgeSize: {
          small: '0.4em',
          medium: '0.8em',
          large: '0.9em',
        },
      },
      medium: {
        value: 768,
        edgeSize: {
          small: '0.1em',
          medium: '0.8em',
          large: '3em',
        },
      },
      large: {
        value: 1440,
        edgeSize: {
          small: '0.4em',
          medium: '0.8em',
          large: '5em',
        },
      },
    },
    deviceBreakpoints: {
      phone: 'small',
      tablet: 'medium',
      computer: 'large',
    },
    focus: {
      border: {
        color: 'transparent',
      },
      outline: {
        color: 'transparent',
      },
    },
    font: {
      family: 'Maven Pro',
      size: '15px',
      weight: 'normal',
      face: `
      /* vietnamese */
      @font-face {
        font-family: 'Maven Pro';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/mavenpro/v32/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8SX21nijogp5.woff2) format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Maven Pro';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/mavenpro/v32/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8SX21nmjogp5.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Maven Pro';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/mavenpro/v32/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8SX21nejog.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `,
    },
  },
  checkBox: {
    border: {
      color: 'brand',
    },
    check: {
      radius: '0',
    },
    size: '1.05em',
  },
  heading: {
    responsiveBreakpoint: 'medium',
  },
  text: {
    margin: 0,
    color: 'brand',
    xsmall: {
      size: '0,8em',
      height: '1em',
    },
    small: {
      size: '1em',
      height: '1.1em',
    },
    regular: {
      size: '1em',
      height: '1em',
    },
    medium: {
      size: '1.2em',
      height: '1.3em',
    },
    large: {
      size: '1.3em',
      height: '1.4em',
    },
    xlarge: {
      size: '1.4em',
      height: '1.6em',
    },
    xxlarge: {
      size: '2em',
      height: '1.7em',
    },
    xxxlarge: {
      size: '2.1em',
      height: '1.8em',
    },
    giant: {
      size: '2.2em',
      height: '1em',
    },
  },
  button: {
    primary: {
      opacity: 0,
      color: '#FFFFFF',
      background: {
        color: 'brand',
      },
      border: {
        radius: '2em',
      },
      extend: `
        font-size: 1.53em;
        height: 2em;
      `,
    },
    secondary: {
      opacity: 0,
      color: '#000000',
      background: {
        color: '#FFFFFF',
      },
      border: {
        color: '#000000',
        width: '0.1em',
        radius: '1em',
      },
      padding: {
        // vertical: '1em'
      },
      extend: `
        height: 2em;
      `,
    },
    default: {
      background: 'transparent',
      color: 'black',
      pad: '0',
      extend: `
        font-weight: normal;

      `,
    },
  },
  pagination: {
    button: {
      hover: {
        background: {
          color: 'none',
        },
        color: 'brand',
      },
      active: {
        background: {
          color: '#FFFFFF',
        },
      },
      color: 'regular-grey',
      size: {
        small: {
          border: {
            radius: '0',
            width: '1.5em',
          },
          pad: {
            vertical: '0',
            horizontal: '0',
          },
          font: '1.9em',
          height: '1.8em',
          width: '1.5em',
        },
      },
    },
    icons: {
      color: 'brand',
    },
  },
});

export default CustomTheme;
