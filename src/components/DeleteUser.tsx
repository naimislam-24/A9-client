// "use client";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { X } from "lucide-react";

// interface DeleteUserProps {
//   order: {
//     _id: string;
//   };
//   onDelete: (id: string) => void;
// }

// const DeleteUser = ({ order, onDelete }: DeleteUserProps) => {
//   const handleDeleteOrder = async () => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/orders/${order._id}`,
//         {
//           method: "DELETE",
//         },
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to delete order");
//       }

//       onDelete(order._id);

//       console.log(data.message);
//     } catch (error) {
//       console.error("Delete Error:", error);
//     }
//   };

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger
//         render={
//           <button
//             type="button"
//             title="Delete Order"
//             className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
//           >
//             <X size={14} />
//             Cancel
//           </button>
//         }
//       >
//         Show Dialog
//       </AlertDialogTrigger>

//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

//           <AlertDialogDescription>
//             This action cannot be undone. This order will be permanently deleted
//             from your records.
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         <AlertDialogFooter>
//           <AlertDialogCancel>No, Keep It</AlertDialogCancel>

//           <AlertDialogAction
//             onClick={handleDeleteOrder}
//             className="bg-red-600 text-white hover:bg-red-700"
//           >
//             Yes, Delete
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default DeleteUser;

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { X } from "lucide-react";

interface DeleteUserProps {
  order: {
    _id: string;
  };
  onDelete: (id: string) => void;
}

const DeleteUser = ({ order, onDelete }: DeleteUserProps) => {
  const handleDeleteOrder = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${order._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete order");
      }

      onDelete(order._id);

      console.log(data.message);
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            title="Delete Order"
            className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            <X size={14} />
            Cancel
          </button>
        }
      >
        Show Dialog
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This order will be permanently deleted
            from your records.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>No, Keep It</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDeleteOrder}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUser;
