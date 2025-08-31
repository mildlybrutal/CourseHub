"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface Video {
	id: string;
	title: string;
	url: string;
	duration?: string;
	thumbnail?: string;
}

interface Course {
	id: number;
	title: string;
	subject: string;
	url: string;
	description?: string;
	instructor?: string;
	videos?: Video[]; // For multi-video courses
}

export default function CoursePage() {
	const params = useParams();
	const router = useRouter();
	const courseId = params.id as string;

	const [course, setCourse] = useState<Course | null>(null);
	const [loading, setLoading] = useState(true);
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());
	const [isPlaying, setIsPlaying] = useState(false);

	// Helper function to check if URL is YouTube
	const isYouTubeUrl = (url: string) => {
		return url.includes("youtube.com") || url.includes("youtu.be");
	};

	// Convert YouTube URL to embed format
	const getYouTubeEmbedUrl = (url: string) => {
		if (!isYouTubeUrl(url)) return url;

		let videoId = "";
		if (url.includes("youtube.com/watch")) {
			videoId = url.split("v=")[1]?.split("&")[0];
		} else if (url.includes("youtu.be/")) {
			videoId = url.split("youtu.be/")[1]?.split("?")[0];
		}

		return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
	};

	// Extract video ID for thumbnail
	const getYouTubeVideoId = (url: string) => {
		if (url.includes("youtube.com/watch")) {
			return url.split("v=")[1]?.split("&")[0];
		} else if (url.includes("youtu.be/")) {
			return url.split("youtu.be/")[1]?.split("?")[0];
		}
		return "";
	};

	const fetchCourse = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`/api/courses/${courseId}`);
			const courseData = res.data;

			// For now, treat single course as a playlist with one video
			// Later you can extend this for multi-video courses
			const videos: Video[] = [
				{
					id: "1",
					title: courseData.title,
					url: courseData.url,
					thumbnail: isYouTubeUrl(courseData.url)
						? `https://img.youtube.com/vi/${getYouTubeVideoId(
								courseData.url
						  )}/mqdefault.jpg`
						: undefined,
				},
			];

			setCourse({ ...courseData, videos });

			// Load watched progress from localStorage
			const savedProgress = localStorage.getItem(
				`course_${courseId}_progress`
			);
			if (savedProgress) {
				setWatchedVideos(new Set(JSON.parse(savedProgress)));
			}
		} catch (error) {
			console.error("Error fetching course:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCourse();
	}, [courseId]);

	// Save progress to localStorage
	const markVideoAsWatched = (videoIndex: number) => {
		const newWatchedVideos = new Set(watchedVideos);
		newWatchedVideos.add(videoIndex);
		setWatchedVideos(newWatchedVideos);

		// Save to localStorage
		localStorage.setItem(
			`course_${courseId}_progress`,
			JSON.stringify(Array.from(newWatchedVideos))
		);
	};

	const handleVideoSelect = (index: number) => {
		setCurrentVideoIndex(index);
		setIsPlaying(true);
	};

	const handleNextVideo = () => {
		if (course?.videos && currentVideoIndex < course.videos.length - 1) {
			markVideoAsWatched(currentVideoIndex);
			setCurrentVideoIndex(currentVideoIndex + 1);
		}
	};

	const handlePreviousVideo = () => {
		if (currentVideoIndex > 0) {
			setCurrentVideoIndex(currentVideoIndex - 1);
		}
	};

	const calculateProgress = () => {
		if (!course?.videos) return 0;
		return Math.round((watchedVideos.size / course.videos.length) * 100);
	};

	if (loading) {
		return (
			<div className="min-h-screen w-full relative bg-black">
				<div
					className="absolute inset-0 z-0"
					style={{
						background:
							"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
					}}
				/>
				<div className="relative z-10 flex items-center justify-center min-h-screen">
					<div className="flex flex-col items-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
						<p className="mt-4 text-emerald-100/80">
							Loading course...
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (!course) {
		return (
			<div className="min-h-screen w-full relative bg-black">
				<div
					className="absolute inset-0 z-0"
					style={{
						background:
							"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
					}}
				/>
				<div className="relative z-10 flex items-center justify-center min-h-screen">
					<div className="text-center">
						<div className="text-emerald-100/60 text-xl mb-4">
							Course not found
						</div>
						<button
							onClick={() => router.push("/courses")}
							className="px-6 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 hover:bg-emerald-500/30 transition-colors"
						>
							Back to Courses
						</button>
					</div>
				</div>
			</div>
		);
	}

	const currentVideo = course.videos?.[currentVideoIndex];
	const isCurrentVideoYouTube = currentVideo
		? isYouTubeUrl(currentVideo.url)
		: false;

	return (
		<div className="min-h-screen w-full relative bg-black">
			{/* Background */}
			<div
				className="absolute inset-0 z-0"
				style={{
					background:
						"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
				}}
			/>

			{/* Content */}
			<div className="relative z-10">
				{/* Header */}
				<div className="bg-black/20 backdrop-blur-sm border-b border-emerald-500/20">
					<div className="max-w-7xl mx-auto px-6 py-4">
						<div className="flex items-center gap-4">
							<button
								onClick={() => router.push("/courses")}
								className="text-emerald-300 hover:text-emerald-200 transition-colors"
							>
								← Back to Courses
							</button>
							<div>
								<h1 className="text-2xl font-bold text-white">
									{course.title}
								</h1>
								<p className="text-emerald-100/80 text-sm">
									{course.subject}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="max-w-7xl mx-auto px-6 py-6">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Video Player - Main Content */}
						<div className="lg:col-span-2">
							<div className="bg-black/40 backdrop-blur-sm rounded-xl border border-emerald-500/20 overflow-hidden">
								{currentVideo && isCurrentVideoYouTube ? (
									<div className="aspect-video">
										<iframe
											src={getYouTubeEmbedUrl(
												currentVideo.url
											)}
											className="w-full h-full"
											allowFullScreen
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											title={currentVideo.title}
										/>
									</div>
								) : (
									<div className="aspect-video flex items-center justify-center bg-gray-900">
										<div className="text-center">
											<p className="text-emerald-100/80 mb-4">
												This video cannot be embedded
											</p>
											<a
												href={currentVideo?.url}
												target="_blank"
												rel="noopener noreferrer"
												className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
											>
												Open in New Tab
											</a>
										</div>
									</div>
								)}

								{/* Video Controls */}
								<div className="p-6">
									<div className="flex items-center justify-between mb-4">
										<h2 className="text-xl font-semibold text-white">
											{currentVideo?.title}
										</h2>
										<button
											onClick={() =>
												markVideoAsWatched(
													currentVideoIndex
												)
											}
											className={`px-4 py-2 rounded-lg text-sm transition-colors ${
												watchedVideos.has(
													currentVideoIndex
												)
													? "bg-emerald-500 text-white"
													: "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
											}`}
										>
											{watchedVideos.has(
												currentVideoIndex
											)
												? "✓ Completed"
												: "Mark Complete"}
										</button>
									</div>

									<div className="flex items-center gap-4">
										<button
											onClick={handlePreviousVideo}
											disabled={currentVideoIndex === 0}
											className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
										>
											← Previous
										</button>
										<button
											onClick={handleNextVideo}
											disabled={
												!course.videos ||
												currentVideoIndex >=
													course.videos.length - 1
											}
											className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
										>
											Next →
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Playlist Sidebar */}
						<div className="lg:col-span-1">
							<div className="bg-black/40 backdrop-blur-sm rounded-xl border border-emerald-500/20 p-6">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-lg font-semibold text-white">
										Course Content
									</h3>
									<span className="text-emerald-300 text-sm">
										{calculateProgress()}% Complete
									</span>
								</div>

								{/* Progress Bar */}
								<div className="w-full bg-gray-700 rounded-full h-2 mb-6">
									<div
										className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
										style={{
											width: `${calculateProgress()}%`,
										}}
									></div>
								</div>

								{/* Video Playlist */}
								<div className="space-y-3">
									{course.videos?.map((video, index) => (
										<div
											key={video.id}
											onClick={() =>
												handleVideoSelect(index)
											}
											className={`p-3 rounded-lg cursor-pointer transition-colors border ${
												index === currentVideoIndex
													? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200"
													: "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50"
											}`}
										>
											<div className="flex items-center gap-3">
												{video.thumbnail && (
													<img
														src={video.thumbnail}
														alt={video.title}
														className="w-16 h-12 object-cover rounded"
													/>
												)}
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-1">
														{watchedVideos.has(
															index
														) && (
															<span className="text-emerald-400 text-sm">
																✓
															</span>
														)}
														<span className="text-xs text-gray-400">
															{index + 1}.
														</span>
													</div>
													<h4 className="text-sm font-medium line-clamp-2">
														{video.title}
													</h4>
													{video.duration && (
														<p className="text-xs text-gray-400 mt-1">
															{video.duration}
														</p>
													)}
												</div>
											</div>
										</div>
									))}
								</div>

								{/* Course Stats */}
								<div className="mt-6 pt-6 border-t border-emerald-500/20">
									<div className="space-y-2 text-sm">
										<div className="flex justify-between text-emerald-100/80">
											<span>Total Videos:</span>
											<span>
												{course.videos?.length || 1}
											</span>
										</div>
										<div className="flex justify-between text-emerald-100/80">
											<span>Completed:</span>
											<span>{watchedVideos.size}</span>
										</div>
										<div className="flex justify-between text-emerald-100/80">
											<span>Remaining:</span>
											<span>
												{(course.videos?.length || 1) -
													watchedVideos.size}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
