import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import SendIcon from '@mui/icons-material/Send';
import {
	Box,
	Card,
	CircularProgress,
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	Typography,
} from '@mui/material';
import { blue, orange } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useLazyGetSummaryQuery } from '../services/articles';

const Summary = () => {
	const [article, setArticle] = useState({ url: '', summary: '' });
	const [allArticles, setAllArticles] = useState([]);
	const [copied, setCopied] = useState('');

	const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

	useEffect(() => {
		const articlesFromLocalStorage = JSON.parse(
			localStorage.getItem('articles')
		);

		if (articlesFromLocalStorage) {
			setAllArticles(articlesFromLocalStorage);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const existingArticle = allArticles.find(
			(item) => item.url === article.url
		);

		if (existingArticle) return setArticle(existingArticle);

		const { data } = await getSummary({ articleUrl: article.url });
		if (data?.summary) {
			const newArticle = { ...article, summary: data.summary };
			const updatedAllArticles = [newArticle, ...allArticles];

			setArticle(newArticle);
			setAllArticles(updatedAllArticles);
			localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
		}
	};

	const handleCopy = (copyUrl) => {
		setCopied(copyUrl);
		navigator.clipboard.writeText(copyUrl);
		setTimeout(() => setCopied(false), 3000);
	};

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			handleSubmit(e);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
				<FormControl fullWidth sx={{ m: 1 }}>
					<Input
						placeholder="Enter a URL"
						id="outlined-adornment-label"
						startAdornment={
							<InputAdornment position="start">
								<LinkIcon />
							</InputAdornment>
						}
						endAdornment={
							<InputAdornment position="end">
								<IconButton type="submit">
									<SendIcon />
								</IconButton>
							</InputAdornment>
						}
						label="url"
						value={article.url}
						onChange={(e) => setArticle({ ...article, url: e.target.value })}
						onKeyDown={handleKeyDown}
						type="url"
					/>
				</FormControl>
			</form>

			<Card
				variant="outlined"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					maxHeight: 50,
					overflowY: 'auto',
				}}
			>
				{allArticles.reverse().map((item, index) => (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}
						key={`link-${index}`}
						onClick={() => setArticle(item)}
					>
						{copied === item.url ? (
							<IconButton onClick={() => handleCopy(item.url)}>
								<CheckIcon />
							</IconButton>
						) : (
							<IconButton onClick={() => handleCopy(item.url)}>
								<ContentCopyIcon />
							</IconButton>
						)}
						<Typography
							variant="body1"
							sx={{ color: blue[700], fontSize: '12px' }}
						>
							{item.url}
						</Typography>
					</Box>
				))}
			</Card>

			<Box
				sx={{
					my: 10,
					maxWidth: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{isFetching ? (
					<CircularProgress />
				) : error ? (
					<Typography
						variant="body1"
						sx={{ fontWeight: 'bold', textAlign: 'center' }}
					>
						Well, that was not supposed to happen...
						<br />
						<span style={{ color: 'gray' }}>{error?.data?.error}</span>
					</Typography>
				) : (
					article.summary && (
						<Card
							variant="outlined"
							sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}
						>
							<Typography variant="h5" component="h2" color={orange[900]}>
								Article Summary
							</Typography>
							<Typography variant="body1">{article.summary}</Typography>
						</Card>
					)
				)}
			</Box>
		</>
	);
};

export default Summary;
