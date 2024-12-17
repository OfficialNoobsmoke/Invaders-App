import { PaletteColor, createTheme } from '@mui/material/styles';

/**
 * Module augmentations
 */

interface BrandGreen {
  variant05: string;
  variant1: string;
  variant2: string;
  variant3: string;
  variant4: string;
  variant5: string;
}

interface BrandGrey {
  variant05: string;
  variant1: string;
  variant2: string;
  variant3: string;
  variant4: string;
  variant5: string;
  variant6: string;
}

interface BrandBlue {
  variant1: string;
}

interface BrandOrange {
  variant2: string;
  variant3: string;
  variant4: string;
  variant5: string;
}

interface BrandYellow {
  variant1: string;
}

interface BrandBlack {
  variant1: string;
}

interface BrandWhite {
  variant1: string;
}

interface Fill {
  primary: string;
  secondary: string;
  secondaryResult: string;
  tertiary: string;
  disabled: string;
}

interface Border {
  inputDefault: string;
  inputActive: string;
  disabled: string;
}

interface WarningPalette {
  content: string;
  accent: string;
  background: string;
}

interface Warnings {
  success: WarningPalette;
  error: WarningPalette;
  warning: WarningPalette;
  info: WarningPalette;
  disabled: {
    content: string;
    background: string;
  };
}

declare module '@mui/material/styles' {
  interface TypeBackground {
    content: string;
    assets: string;
  }

  interface TypeText {
    primaryWhite: string;
  }

  interface Palette {
    secondaryResult: PaletteColor;
    brandGreen: BrandGreen;
    brandGrey: BrandGrey;
    brandBlue: BrandBlue;
    brandOrange: BrandOrange;
    brandYellow: BrandYellow;
    brandBlack: BrandBlack;
    brandWhite: BrandWhite;
    fill: Fill;
    border: Border;
    warnings: Warnings;
  }

  interface PaletteOptions {
    secondaryResult: PaletteColor;
    brandGreen: BrandGreen;
    brandGrey: BrandGrey;
    brandBlue: BrandBlue;
    brandOrange: BrandOrange;
    brandYellow: BrandYellow;
    brandBlack: BrandBlack;
    brandWhite: BrandWhite;
    fill: Fill;
    border: Border;
    warnings: Warnings;
  }
}

declare module '@mui/material/styles/createTypography' {
  interface FontStyle {
    fontWeightRoman: React.CSSProperties['fontWeight'];
    lineHeight100: React.CSSProperties['lineHeight'];
    lineHeight110: React.CSSProperties['lineHeight'];
    lineHeight120: React.CSSProperties['lineHeight'];
    lineHeight130: React.CSSProperties['lineHeight'];
    lineHeight140: React.CSSProperties['lineHeight'];
    lineHeight150: React.CSSProperties['lineHeight'];
    fontSize12: React.CSSProperties['fontSize'];
    fontSize14: React.CSSProperties['fontSize'];
    fontSize16: React.CSSProperties['fontSize'];
    fontSize20: React.CSSProperties['fontSize'];
    fontSize24: React.CSSProperties['fontSize'];
    fontSize32: React.CSSProperties['fontSize'];
    fontSize40: React.CSSProperties['fontSize'];
    fontSize56: React.CSSProperties['fontSize'];
    fontSize72: React.CSSProperties['fontSize'];
  }

  interface Typography {
    body: React.CSSProperties;
    bodyBold: React.CSSProperties;
    bodyLarge: React.CSSProperties;
    bodyLargeBold: React.CSSProperties;
    bodyLink: React.CSSProperties;
    buttonLink: React.CSSProperties;
    buttonLinkSmall: React.CSSProperties;
    captionBold: React.CSSProperties;
    input: React.CSSProperties;
    label: React.CSSProperties;
    labelBold: React.CSSProperties;
  }

  interface TypographyOptions {
    body?: React.CSSProperties;
    bodyBold?: React.CSSProperties;
    bodyLarge?: React.CSSProperties;
    bodyLargeBold?: React.CSSProperties;
    bodyLink?: React.CSSProperties;
    buttonLink?: React.CSSProperties;
    buttonLinkSmall?: React.CSSProperties;
    captionBold?: React.CSSProperties;
    input?: React.CSSProperties;
    label?: React.CSSProperties;
    labelBold?: React.CSSProperties;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    secondaryResult: true;
  }
}

declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
    secondaryResult: true;
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    padded: true;
  }
}

/**
 * Digitalarkivet base typography
 */

const themeTypography = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: [
      "'Neue Haas Grotesk'",
      "'Source Sans 3'",
      "'Source Sans Pro'",
      "'Helvetica Neue'",
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightBold: 500,
    fontWeightRoman: 400, // Alias for fontWeightRegular
    lineHeight100: 1.0,
    lineHeight110: 1.1,
    lineHeight120: 1.2,
    lineHeight130: 1.3,
    lineHeight140: 1.4,
    lineHeight150: 1.5,
    fontSize12: 12,
    fontSize14: 14,
    fontSize16: 16,
    fontSize20: 20,
    fontSize24: 24,
    fontSize32: 32,
    fontSize40: 32,
    fontSize56: 56,
    fontSize72: 72,
  },
});

/**
 * Digitalarkivet palette and typography
 */

const themeColors = createTheme({
  shape: {
    borderRadius: 2,
  },
  palette: {
    background: {
      default: '#F9FAF7',
      content: '#FFFFFF',
      assets: '#F8F8F8',
    },
    fill: {
      primary: '#2F4029',
      secondary: '#E8F7CF',
      secondaryResult: '#E3ECF9',
      tertiary: '#EDF1E8',
      disabled: '#EBEBEB',
    },
    text: {
      primary: '#1D1D1D',
      primaryWhite: '#FFFFFF',
      secondary: '#636363',
      disabled: '#AEAEAE',
    },
    primary: {
      main: '#2F4029',
      contrastText: '#FFFFFF',
      dark: '#2B3B26',
      light: '#505F4B',
    },
    secondary: {
      main: '#DFF0C2',
      contrastText: '#1D1D1D',
      dark: '#CDDDB2',
      light: '#E4F2CC',
    },
    secondaryResult: {
      main: '#E3ECF9',
      contrastText: '#1D1D1D',
      dark: '#D1D9E5',
      light: '#E7EFFA',
    },
    brandGreen: {
      variant05: '#F9FAF7',
      variant1: '#DFF0C2',
      variant2: '#C6D7A9',
      variant3: '#AEBF90',
      variant4: '#7C8E5D',
      variant5: '#2F4029',
    },
    brandBlue: {
      variant1: '#E3ECF9',
    },
    brandOrange: {
      variant2: '#FCD1A4',
      variant3: '#FEB37F',
      variant4: '#FF965B',
      variant5: '#A73C2E',
    },
    brandYellow: {
      variant1: '#FBEEC8',
    },
    brandBlack: {
      variant1: '#000000',
    },
    brandWhite: {
      variant1: '#FFFFFF',
    },
    brandGrey: {
      variant05: '#F8F8F8',
      variant1: '#EBEBEB',
      variant2: '#D7D7D7',
      variant3: '#C2C2C2',
      variant4: '#AEAEAE',
      variant5: '#636363',
      variant6: '#1D1D1D',
    },
    border: {
      inputDefault: '#D7D7D7',
      inputActive: '#1D1D1D',
      disabled: '#D7D7D7',
    },
    warnings: {
      success: {
        content: '#2F4029',
        accent: '#3B5F00',
        background: '#E8F7CF',
      },
      error: {
        content: '#631901',
        accent: '#EB3B00',
        background: '#FFDCD7',
      },
      warning: {
        content: '#4D3814',
        accent: '#E25F00',
        background: '#FFEED1',
      },
      info: {
        content: '#123565',
        accent: '#2A6AC5',
        background: '#E3ECF9',
      },
      disabled: {
        content: '#AEAEAE',
        background: '#EBEBEB',
      },
    },
  },
  typography: {
    ...themeTypography.typography,
    body: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize16,
      lineHeight: themeTypography.typography.lineHeight150,
    },
    bodyBold: {
      fontWeight: themeTypography.typography.fontWeightBold,
      fontSize: themeTypography.typography.fontSize16,
      lineHeight: themeTypography.typography.lineHeight150,
    },
    bodyLarge: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize20,
      lineHeight: themeTypography.typography.lineHeight150,
    },
    bodyLargeBold: {
      fontWeight: themeTypography.typography.fontWeightBold,
      fontSize: themeTypography.typography.fontSize20,
      lineHeight: themeTypography.typography.lineHeight150,
    },
    bodyLink: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize16,
      lineHeight: themeTypography.typography.lineHeight150,
    },
    buttonLink: {
      fontWeight: themeTypography.typography.fontWeightBold,
      fontSize: themeTypography.typography.fontSize16,
      lineHeight: themeTypography.typography.lineHeight150,
    },
    buttonLinkSmall: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize12,
      lineHeight: themeTypography.typography.lineHeight150,
    },
    caption: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize14,
      lineHeight: themeTypography.typography.lineHeight140,
    },
    captionBold: {
      fontWeight: themeTypography.typography.fontWeightBold,
      fontSize: themeTypography.typography.fontSize14,
      lineHeight: themeTypography.typography.lineHeight140,
    },
    h1: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize72,
      lineHeight: themeTypography.typography.lineHeight130,
    },
    h2: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize56,
      lineHeight: themeTypography.typography.lineHeight130,
    },
    h3: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize40,
      lineHeight: themeTypography.typography.lineHeight130,
    },
    h4: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize32,
      lineHeight: themeTypography.typography.lineHeight130,
    },
    h5: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize24,
      lineHeight: themeTypography.typography.lineHeight130,
    },
    input: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize16,
      lineHeight: themeTypography.typography.lineHeight150,
    },
    label: {
      fontWeight: themeTypography.typography.fontWeightRoman,
      fontSize: themeTypography.typography.fontSize12,
      lineHeight: themeTypography.typography.lineHeight130,
    },
    labelBold: {
      fontWeight: themeTypography.typography.fontWeightBold,
      fontSize: themeTypography.typography.fontSize12,
      lineHeight: themeTypography.typography.lineHeight130,
    },
  },
});

/**
 * Digitalarkivet MUI theme
 */

const theme = createTheme(
  {
    components: {
      MuiPaper: {
        variants: [
          {
            props: {
              variant: 'padded',
            },
            style: {
              padding: '2rem 3rem',
              marginBottom: '1rem',
              borderRadius: '1px',
              boxShadow: '0px 0px 0px 1px #E0E0E0',
            },
          },
        ],
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          sx: {
            textTransform: 'none',
          },
        },
      },
      MuiFab: {
        defaultProps: {
          color: 'primary',
          sx: {
            boxShadow: 0,
            ':active': {
              boxShadow: 0,
            },
            textTransform: 'none',
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          colorPrimary: {
            '&': {
              background:
                'radial-gradient(ellipse at center, ' +
                themeColors.palette.fill.tertiary +
                ' 0%, ' +
                themeColors.palette.fill.tertiary +
                ' 20%, ' +
                themeColors.palette.fill.tertiary +
                ' 20%, ' +
                themeColors.palette.fill.tertiary +
                ' 20%, rgba(0,0,0,0) 20%)',
              padding: '6px',
            },
            '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)': {
              borderWidth: '1px',
              borderStyle: 'solid',
              boderColor: themeColors.palette.border.inputActive,
              borderRadius: '50%',
            },
            '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root) path': {
              color: themeColors.palette.fill.tertiary,
              stroke: themeColors.palette.fill.tertiary,
              strokeWidth: 5,
              boxShadow: ' 0px 0px 0px 99px rgba(0,0,0,1) inset',
            },
            '&.Mui-checked': {
              background:
                'radial-gradient(ellipse at center, ' +
                themeColors.palette.brandGreen.variant1 +
                ' 0%, ' +
                themeColors.palette.brandGreen.variant1 +
                ' 20%, ' +
                themeColors.palette.brandGreen.variant1 +
                ' 20%, ' +
                themeColors.palette.brandGreen.variant1 +
                ' 20%, rgba(0,0,0,0) 20%)',
              '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root) path': {
                color: themeColors.palette.brandGreen.variant1,
                stroke: themeColors.palette.brandGreen.variant1,
              },
            },
            '&.Mui-disabled': {
              background:
                'radial-gradient(ellipse at center, ' +
                themeColors.palette.fill.disabled +
                ' 0%, ' +
                themeColors.palette.fill.disabled +
                ' 20%, ' +
                themeColors.palette.fill.disabled +
                ' 20%, ' +
                themeColors.palette.fill.disabled +
                ' 20%, rgba(0,0,0,0) 20%)',
              '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root) path': {
                color: themeColors.palette.fill.disabled,
                stroke: themeColors.palette.fill.disabled,
              },
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          colorPrimary: {
            color: themeColors.palette.text.primary,
            '&.Mui-disabled': {
              color: themeColors.palette.brandGrey.variant4,
            },
          },
          track: {
            opacity: 1,
            backgroundColor: themeColors.palette.fill.tertiary,
            '.Mui-checked.Mui-checked + &': {
              opacity: 1,
              backgroundColor: themeColors.palette.brandGreen.variant1,
            },
            '.Mui-disabled.Mui-disabled + &': {
              opacity: 1,
              backgroundColor: themeColors.palette.fill.disabled,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderWidth: '1px',
              },
            },
          },
        },
        variants: [
          {
            props: {
              variant: 'standard',
            },
            style: {
              '& .MuiInput-underline:after': {
                borderBottomWidth: '1px',
              },
              '&& .MuiInput-root:hover::before': {
                borderBottomWidth: '1px',
              },
              '&& .MuiInput-root.Mui-disabled::before': {
                borderBottomStyle: 'solid',
              },
            },
          },
        ],
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: themeColors.palette.brandGreen.variant05,
            },
            '&:focus': {
              backgroundColor: themeColors.palette.brandGreen.variant05,
            },
            '&.Mui-selected': {
              backgroundColor: themeColors.palette.fill.tertiary,
              '&:hover': {
                backgroundColor: themeColors.palette.brandGreen.variant05,
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: themeColors.palette.fill.secondary,
            fontWeight: themeTypography.typography.fontWeightBold,
            fontSize: themeTypography.typography.fontSize12,
            '&:hover': {
              backgroundColor: themeColors.palette.secondary.dark,
            },
            '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root) path': {
              color: themeColors.palette.text.primary,
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            '& span': {
              fontWeight: themeTypography.typography.fontWeightBold,
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: themeColors.palette.background.content,
            color: themeColors.palette.text.primary,
            fontSize: themeTypography.typography.fontSize12,
            boxShadow: '0px 8px 20px 5px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
  themeColors
);

export default theme;
