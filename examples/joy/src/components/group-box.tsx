import { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/joy";

export type GroupBoxProps = {
  children: ReactNode;
  title?: string;
  footer?: string;
  fullHeight?: boolean;
};

export const GroupBox = (props: GroupBoxProps) => {
  const { title, footer, children, fullHeight = false } = props;

  return (
    <Box bgcolor={t => t.palette.neutral["100"]} p={1} height={fullHeight ? 1 : undefined} borderRadius={theme => `${theme.radius}px`}>
      <Stack gap={0}>
        {title && <Typography level="title-md">{title}</Typography>}
        <Stack>{children}</Stack>
        {footer && (
          <Typography fontStyle="italic" textColor="info.main">
            {footer}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
