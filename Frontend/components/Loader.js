import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';

export default function Loader() {
    const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%', }} className="">
      <LinearProgress variant="determinate" color="success" value={progress} />
    </Box>
  );
}