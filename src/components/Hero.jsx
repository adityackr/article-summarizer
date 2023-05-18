import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';

const Hero = () => {
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar
					position="static"
					elevation={0}
					sx={{ backgroundColor: 'transparent', color: '#000' }}
				>
					<Toolbar>
						<Typography
							variant="h4"
							component="div"
							sx={{ flexGrow: 1, color: orange[900], fontWeight: 700 }}
						>
							SUMZAD
						</Typography>
						<Button
							variant="contained"
							sx={{ borderRadius: 20, backgroundColor: '#000' }}
						>
							Github
						</Button>
					</Toolbar>
				</AppBar>
			</Box>

			<Box sx={{ textAlign: 'center', marginTop: 4, lineHeight: 2 }}>
				<Typography variant="h3">Summarize Articles</Typography>
				<Typography variant="h3">With</Typography>
				<Typography variant="h3" color={orange[900]}>
					OpenAI GPT-4
				</Typography>
			</Box>
		</>
	);
};

export default Hero;
