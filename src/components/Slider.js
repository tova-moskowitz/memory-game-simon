import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

export default function ContinuousSlider({ handleChangeSlider }) {
  // const [value, setValue] = React.useState();
  return (
    <Box sx={{ width: 800 }}>
      <Stack spacing={2} direction="row" sx={{ ml: 80 }}>
        <Slider
          aria-label="Difficulty"
          // value={value}
          onChange={handleChangeSlider}
          valueLabelDisplay="auto"
          min={2}
          max={20}
        />
      </Stack>
    </Box>
  );
}
