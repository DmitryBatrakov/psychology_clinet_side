import { Card, CardAction, CardDescription } from "@/components/ui/card";
import { TherapistFaqItem } from "../../model/types";
import { X } from "lucide-react";

type Props = {
    card: TherapistFaqItem;
    onClose: () => void;
};

export const TherapyFaqModal = ({ card, onClose }: Props) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <Card className="w-80 h-80 bg-white rounded-lg shadow-lg p-4 relative">
                <CardAction onClick={onClose} className="cursor-pointer absolute top-0 left-0 p-2">
                    <X size={20} />
                </CardAction>
                <h1 className="text-2xl font-bold">{card.questions}</h1>
                <CardDescription className="text-gray-500 p-2">
                    {card.answers}
                </CardDescription>
            </Card>
        </div>
    );
};
