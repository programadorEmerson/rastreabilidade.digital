import { Avatar, Box, Typography, useTheme } from '@mui/material';

import { useAuthContext } from '@hooks';

function AvatarUser() {
  const { user } = useAuthContext();
  const { palette } = useTheme();
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box display="flex" flexDirection="column" marginRight="0.5rem">
        <Typography
          variant="caption"
          display="block"
          color={palette.text.secondary}
          align="right"
        >
          {user?.name}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          color={palette.text.secondary}
          align="right"
        >
          {user?.email}
        </Typography>
      </Box>
      <Avatar
        alt={user?.name}
        src={user?.urlImage}
        sx={{ width: 46, height: 46 }}
      />
    </Box>
  );
}

export default AvatarUser;
