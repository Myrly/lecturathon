import { HiOutlineClock } from "solid-icons/hi";
import { Component, createSignal, onCleanup } from "solid-js";

/**
 * Timer is a countdown component until endTime. It display the remaining time is HH:MM format. When the time is up, it will display "00:00".
 * @param props endTime: Date
 * @returns Timer component that displays the time left until the endTime
 */
const Timer: Component<{endTime: Date}> = (props: {endTime: Date}) => {
  const [timeLeft, setTimeLeft] = createSignal({ hours: 0, minutes: 0 });

  const calculateTimeLeft = () => {
    const now = new Date(); 
    
    const difference = now.getTime() - props.endTime.getTime();
    
    if (difference <= 0) {
      return { hours: 0, minutes: 0 };
    }
    
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    if (seconds > 0) {
      minutes += 1;
      
      if (minutes === 60) {
        minutes = 0;
        hours += 1;
      }
    }
    
    return { hours, minutes };
  };

  setTimeLeft(calculateTimeLeft());
  
  const intervalId = setInterval(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);
  
  onCleanup(() => clearInterval(intervalId));
  
  const formattedTime = () => 
    `${String(timeLeft().hours).padStart(2, '0')}:${String(timeLeft().minutes).padStart(2, '0')}`;

  return (
    <>
    <div class="flex items-center justify-center">
      <HiOutlineClock class="mx-2 size-4" />
      <p class="text-[14px] text-muted-foreground font-mono">{formattedTime()}</p>
    </div>
    </>
  );
};

export default Timer;