import { useTheme } from "@/hooks/use-theme";
import { Star } from "lucide-react";

export const StarRating = ({ rating, max = 5, size = 20, className = "" }: StarRating) => {
    const { theme } = useTheme();
    return (
        <div className={`flex gap-1 flex-wrap ${className}`}>
            {Array.from({ length: max }).map((_, i) => {

                const bgFill = i < rating ? '#FFFF00' : 'transparent';
                const colorFill = theme !== 'dark' ? '#000000' : '#dadada';

                return <Star key={i} size={size} fill={bgFill} color={colorFill} strokeWidth={1} />;
            })}
        </div>
    );
};