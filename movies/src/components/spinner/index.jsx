import CircularProgress from '@mui/material/CircularProgress';

// Show a loading indicator
export default function CircularIndeterminate() {
  return (
    <div sx={{
        display: 'flex',
        justifyContent: "center",
        '& > * + *': {
          marginLeft: '2em',
        }}}>
      <CircularProgress />
      <CircularProgress />
    </div>
  );
}
