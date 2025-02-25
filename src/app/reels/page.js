import MiniDrawer from "@/components/sidenav";
import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Heart,MessageCircle,Send,LucideSave } from "lucide-react";
const videos=[{src:"https://assets.codepen.io/6093409/river.mp4",owner:"Eden Awoke",followingstatus:"true",description:"this is a mock video",audio:"song"},
    {src:"https://assets.codepen.io/6093409/river.mp4",owner:"Eden Awoke",followingstatus:"true",description:"this is a mock video",audio:"song"},
    {src:"https://assets.codepen.io/6093409/river.mp4",owner:"Eden Awoke",followingstatus:"true",description:"this is a mock video",audio:"song"},
    {src:"https://assets.codepen.io/6093409/river.mp4",owner:"Eden Awoke",followingstatus:"true",description:"this is a mock video",audio:"song"} ]

export default function Reels() {
  return (
    <div className="flex  min-h-screen">
      <MiniDrawer value="true" />
      <div className="flex flex-col gap-4 justify-center items-center flex-grow overflow-auto">
       
        {videos.map((video,index)=>(
         <div className="flex  gap-2 "key={index}> 
        <Box
          component="ul"
          className="flex justify-center items-center w-[400px] h-screen p-0 m-auto"
        >
          <Card component="li" className="w-[400px] min-w-[300px] h-screen ">
            <CardCover>
              <video
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              >
                <source
                  src={video.src}
                  type="video/mp4"
                />
              </video>
            </CardCover>
            <CardContent>
              <Typography
               className="h-full flex flex-col justify-end text-white"
              >
                <p>{video.name} <span>{video.followingstatus}</span></p>
                <p>{video.description}</p>
                <p className="bg-black bg-opacity-20 w-fit pr-4 pl-4 rounded-sm">{video.audio}</p>
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <div className="flex flex-col justify-end pb-6 gap-2">
            <Heart/><span className="text-sm ">14.8k</span>
            <MessageCircle/><span className="text-sm ">140</span>
            <Send/>
            <LucideSave/>

        </div> </div>))}
        
       
      </div>
    </div>
  );
}
