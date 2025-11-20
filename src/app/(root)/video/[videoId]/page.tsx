import { notFound } from "next/navigation";

import { VideoDetailHeader, VideoInfo, VideoPlayer } from "@/components";
import { getTranscript, getVideoById } from "@/lib/actions/video";

const page = async ({ params }: { params: Promise<{ videoId: string }> }) => {
  const { videoId } = await params;

  try {
    const result = await getVideoById(videoId);
    
    if (!result || !result.video) {
      console.error("Video not found:", videoId);
      notFound(); // This will use the (root)/not-found.tsx
    }

    const { user, video } = result;
    const transcript = await getTranscript(videoId);

    return (
      <main className="wrapper page">
        <VideoDetailHeader
          title={video.title}
          createdAt={video.createdAt}
          userImg={user?.image}
          username={user?.name}
          videoId={video.videoId}
          ownerId={video.userId}
          visibility={video.visibility}
          thumbnailUrl={video.thumbnailUrl}
        />

        <section className="video-details">
          <div className="content">
            <VideoPlayer videoId={video.videoId} />
          </div>

          <VideoInfo
            transcript={transcript}
            title={video.title}
            createdAt={video.createdAt}
            description={video.description}
            videoId={videoId}
            videoUrl={video.videoUrl}
          />
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error loading video:", error);
    notFound();
  }
};

export default page;