// "use client";

// import Link from "next/link";
// import { MoveRight } from "lucide-react";
// import Widget, { WidgetProps } from "@/components/blocks/widgets/widget";
// import { PatientBody } from '../../../../../features/patient-view/ui/PatientBody';

// export default function PatientViewPage({ ...rest }: WidgetProps) {
//     return (
//         <Widget {...rest} className="">
//             <Widget.Header>
//                 <Widget.Title className="flex items-center gap-2 text-lg font-semibold">
//                     <Link
//                         href="/dashboard"
//                         className="flex items-center justify-center gap-2 text-primary cursor-pointer"
//                     >
//                         <MoveRight size={20} />
//                         <span>חזרה</span>
//                     </Link>
//                 </Widget.Title>
//             </Widget.Header>
//             <Widget.Content className="overflow-y-auto custom-scrollbar">
//                 <PatientBody />
//             </Widget.Content>
//         </Widget>
//     );
// }


"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import Widget, { WidgetProps } from "@/components/blocks/widgets/widget";
import { PatientBody } from '../../../../../features/patient-view/ui/PatientBody';

export default function PatientViewPage({ ...rest }: WidgetProps) {
    return (
        <PatientBody />
    );
}
