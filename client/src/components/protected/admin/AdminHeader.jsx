import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router';

import SitemarkIcon from './../../SitemarkIcon.jsx';
import ColorModeIconDropdown from './../../../shared-theme/ColorModeIconDropdown.jsx';

function AdminHeader() {


  return (

    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <SitemarkIcon />
      <Typography
        variant="h6"
        sx={{
          fontWeight: '700',
          ml: 1,
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        ADMIN PANEL
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ marginLeft: 'auto' }}
      >
        <Stack direction="row" alignItems="center">
          <ColorModeIconDropdown />
        </Stack>
      </Stack>
    </Stack>

  );
}

export default AdminHeader;
