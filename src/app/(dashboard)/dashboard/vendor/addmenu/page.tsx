// "use client";

// import React, { FormEvent, useEffect, useState } from "react";
// import {
//   Pizza,
//   ImagePlus,
//   X,
//   Loader2,
//   Plus,
//   CheckCircle2,
//   AlertCircle,
//   MapPin,
//   DollarSign,
//   Utensils,
//   FileText,
// } from "lucide-react";
// import { useSession } from "@/lib/auth-client";
// import { getTokenFromClient } from "@/lib/getTokenFromClient";

// const categories = [
//   "Pizza",
//   "Burger",
//   "Pasta",
//   "Sandwich",
//   "Chicken",
//   "Seafood",
//   "Dessert",
//   "Drinks",
//   "Other",
// ];

// const AddMenuItemPage = () => {
//   const { data: session } = useSession();

//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [message, setMessage] = useState({
//     type: "",
//     text: "",
//   });

//   useEffect(() => {
//     return () => {
//       if (imagePreview) URL.revokeObjectURL(imagePreview);
//     };
//   }, [imagePreview]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setMessage({
//         type: "error",
//         text: "Please select a valid image file.",
//       });
//       e.target.value = "";
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setMessage({
//         type: "error",
//         text: "Image size must be less than 5MB.",
//       });
//       e.target.value = "";
//       return;
//     }

//     setImage(file);
//     setImagePreview(URL.createObjectURL(file));
//     setMessage({ type: "", text: "" });
//   };

//   const removeImage = () => {
//     setImage(null);
//     setImagePreview(null);
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setMessage({ type: "", text: "" });

//     if (!image) {
//       setMessage({
//         type: "error",
//         text: "Please upload an item image.",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//       const imgbbKey = process.env.NEXT_PUBLIC_IMGBB;

//       if (!apiUrl || !imgbbKey) {
//         throw new Error("API configuration is missing.");
//       }

//       const form = e.currentTarget;
//       const formData = new FormData(form);

//       // 1. Upload image to ImgBB
//       const imageData = new FormData();
//       imageData.append("image", image);

//       const imageResponse = await fetch(
//         `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
//         {
//           method: "POST",
//           body: imageData,
//         },
//       );

//       const imageResult = await imageResponse.json();
//       // console.log(imageResult);

//       if (!imageResponse.ok || !imageResult.success) {
//         throw new Error("Image upload failed. Please try again.");
//       }

//       const imageUrl = imageResult.data.display_url;

//       // 2. Prepare menu item data
//       const menuItem = {
//         itemName: formData.get("itemName"),
//         category: formData.get("category"),
//         description: formData.get("description"),
//         price: Number(formData.get("price")),
//         location: formData.get("location"),
//         imageUrl,
//         email: session?.user?.email,
//       };

//       // 3. POST menu item to backend
//       const token = await getTokenFromClient();
//       const response = await fetch(`${apiUrl.replace(/\/$/, "")}/usersvendor`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify(menuItem),
//       });

//       // const result = await response.json();
//       // console.log(result);

//       const result = await response.json();
//       if (!response.ok) {
//         if (result.limitReached) {
//           window.location.href = "/dashboard/vendor/subscription";
//           return;
//         }
//         throw new Error(result.message || "Failed to add menu item.");
//       }

//       setMessage({
//         type: "success",
//         text: "Menu item submitted successfully! Waiting for admin approval.",
//       });

//       form.reset();
//       setImage(null);
//       setImagePreview(null);
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text:
//           error instanceof Error
//             ? error.message
//             : "Something went wrong. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f9fc] px-3 py-6 sm:px-6 sm:py-9 lg:px-8">
//       <div className="mx-auto max-w-4xl">
//         {/* Header */}
//         <div className="mb-7">
//           <div className="mb-3 flex items-center gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
//               <Pizza size={25} />
//             </div>

//             <div>
//               <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
//                 Add Menu Item
//               </h1>

//               <p className="mt-1 text-sm text-gray-500">
//                 Add a delicious item to your restaurant menu.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Form Card */}
//         <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
//           <div className="border-b border-gray-100 px-5 py-5 sm:px-8">
//             <h2 className="text-lg font-bold text-gray-800">
//               Menu Information
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Fill in the details below to create a new menu item.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-8">
//             {/* Item Name */}
//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700">
//                 Item Name <span className="text-red-500">*</span>
//               </label>

//               <input
//                 type="text"
//                 name="itemName"
//                 placeholder="e.g. Margherita Pizza"
//                 required
//                 maxLength={100}
//                 className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
//               />
//             </div>

//             {/* Category */}
//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700">
//                 Category <span className="text-red-500">*</span>
//               </label>

//               <div className="relative">
//                 <Utensils
//                   size={17}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                 />

//                 <select
//                   name="category"
//                   required
//                   defaultValue=""
//                   className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
//                 >
//                   <option value="" disabled>
//                     Select a category
//                   </option>

//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700">
//                 Description <span className="text-red-500">*</span>
//               </label>

//               <div className="relative">
//                 <FileText
//                   size={17}
//                   className="absolute left-4 top-4 text-gray-400"
//                 />

//                 <textarea
//                   name="description"
//                   rows={5}
//                   required
//                   maxLength={1000}
//                   placeholder="Describe your delicious menu item..."
//                   className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
//                 />
//               </div>
//             </div>

//             {/* Price & Location */}
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-gray-700">
//                   Price (৳) <span className="text-red-500">*</span>
//                 </label>

//                 <div className="relative">
//                   <DollarSign
//                     size={17}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   />

//                   <input
//                     type="number"
//                     name="price"
//                     min="1"
//                     step="0.01"
//                     required
//                     placeholder="Enter price"
//                     className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-gray-700">
//                   Location <span className="text-red-500">*</span>
//                 </label>

//                 <div className="relative">
//                   <MapPin
//                     size={17}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   />

//                   <input
//                     type="text"
//                     name="location"
//                     required
//                     placeholder="Area / City"
//                     className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700">
//                 Item Image <span className="text-red-500">*</span>
//               </label>

//               {imagePreview ? (
//                 <div className="relative overflow-hidden rounded-2xl border border-gray-200">
//                   <img
//                     src={imagePreview}
//                     alt="Menu item preview"
//                     className="h-56 w-full object-cover sm:h-64"
//                   />

//                   <button
//                     type="button"
//                     onClick={removeImage}
//                     className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-50"
//                     aria-label="Remove image"
//                   >
//                     <X size={19} />
//                   </button>

//                   <div className="bg-white px-4 py-3 text-sm font-medium text-gray-600">
//                     {image?.name}
//                   </div>
//                 </div>
//               ) : (
//                 <label
//                   htmlFor="itemImage"
//                   className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/70 px-4 py-8 text-center transition hover:border-red-400 hover:bg-red-50/40"
//                 >
//                   <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
//                     <ImagePlus size={25} />
//                   </div>

//                   <p className="text-sm font-semibold text-gray-700">
//                     Click to upload an image
//                   </p>

//                   <p className="mt-1 text-xs text-gray-400">
//                     PNG, JPG or WEBP (Maximum 5MB)
//                   </p>
//                 </label>
//               )}

//               <input
//                 id="itemImage"
//                 type="file"
//                 accept="image/png,image/jpeg,image/webp"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>

//             {/* Plan Notice */}
//             <div className="flex gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
//               <AlertCircle
//                 size={20}
//                 className="mt-0.5 shrink-0 text-orange-500"
//               />

//               <div>
//                 <p className="text-sm font-bold text-gray-800">
//                   Free Plan: 3 Active Items
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
//                   New menu items require admin approval. Your submitted item
//                   will remain Pending until approved.
//                 </p>
//               </div>
//             </div>

//             {/* Response Message */}
//             {message.text && (
//               <div
//                 className={`flex items-start gap-2 rounded-xl p-4 text-sm ${
//                   message.type === "success"
//                     ? "border border-green-200 bg-green-50 text-green-700"
//                     : "border border-red-200 bg-red-50 text-red-600"
//                 }`}
//               >
//                 {message.type === "success" ? (
//                   <CheckCircle2 size={19} className="shrink-0" />
//                 ) : (
//                   <AlertCircle size={19} className="shrink-0" />
//                 )}

//                 <p>{message.text}</p>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
//               <button
//                 type="reset"
//                 onClick={() => {
//                   setImage(null);
//                   setImagePreview(null);
//                   setMessage({ type: "", text: "" });
//                 }}
//                 disabled={loading}
//                 className="h-12 rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
//               >
//                 Reset Form
//               </button>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-7 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:from-red-600 hover:to-orange-600 hover:shadow-red-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 size={18} className="animate-spin" />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Plus size={19} />
//                     Submit Menu Item
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         <p className="mt-5 text-center text-xs text-gray-400">
//           Make your menu delicious and attract more customers.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AddMenuItemPage;

// *****************************************************************

// "use client";

// import React, { FormEvent, useEffect, useState } from "react";
// import {
//   Pizza,
//   ImagePlus,
//   X,
//   Loader2,
//   Plus,
//   CheckCircle2,
//   AlertCircle,
//   MapPin,
//   DollarSign,
//   Utensils,
//   FileText,
// } from "lucide-react";
// import { getTokenFromClient } from "@/lib/getTokenFromClient";

// const categories = [
//   "Pizza",
//   "Burger",
//   "Pasta",
//   "Sandwich",
//   "Chicken",
//   "Seafood",
//   "Dessert",
//   "Drinks",
//   "Other",
// ];

// const AddMenuItemPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const [message, setMessage] = useState({
//     type: "",
//     text: "",
//   });

//   useEffect(() => {
//     return () => {
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [imagePreview]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setMessage({
//         type: "error",
//         text: "Please select a valid image file.",
//       });

//       e.target.value = "";
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setMessage({
//         type: "error",
//         text: "Image size must be less than 5MB.",
//       });

//       e.target.value = "";
//       return;
//     }

//     setImage(file);
//     setImagePreview(URL.createObjectURL(file));
//     setMessage({ type: "", text: "" });
//   };

//   const removeImage = () => {
//     setImage(null);
//     setImagePreview(null);
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setMessage({ type: "", text: "" });

//     if (!image) {
//       setMessage({
//         type: "error",
//         text: "Please upload an item image.",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

//       const imgbbKey = process.env.NEXT_PUBLIC_IMGBB;

//       if (!apiUrl || !imgbbKey) {
//         throw new Error("API configuration is missing.");
//       }

//       const form = e.currentTarget;
//       const formData = new FormData(form);

//       // Upload image to ImgBB
//       const imageData = new FormData();
//       imageData.append("image", image);

//       const imageResponse = await fetch(
//         `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
//         {
//           method: "POST",
//           body: imageData,
//         },
//       );

//       const imageResult = await imageResponse.json();

//       if (!imageResponse.ok || !imageResult.success) {
//         throw new Error("Image upload failed.");
//       }

//       const imageUrl = imageResult.data.display_url;

//       // Prepare menu item
//       const menuItem = {
//         itemName: formData.get("itemName"),
//         category: formData.get("category"),
//         description: formData.get("description"),
//         price: Number(formData.get("price")),
//         location: formData.get("location"),
//         imageUrl,
//       };

//       // Get authentication token
//       const token = await getTokenFromClient();

//       if (!token) {
//         throw new Error("Please login again.");
//       }

//       // Send menu item to backend
//       const response = await fetch(`${apiUrl}/usersvendor`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify(menuItem),
//       });

//       const result = await response.json();

//       // Free plan limit reached
//       if (response.status === 403 && result.limitReached) {
//         window.location.href = "/dashboard/vendor/subscription";
//         return;
//       }

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to add menu item.");
//       }

//       setMessage({
//         type: "success",
//         text: "Menu item submitted successfully! Waiting for admin approval.",
//       });

//       form.reset();
//       setImage(null);
//       setImagePreview(null);
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text: error instanceof Error ? error.message : "Something went wrong.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f9fc] px-3 py-6 sm:px-6 sm:py-9 lg:px-8">
//       <div className="mx-auto max-w-4xl">
//         {/* Header */}
//         <div className="mb-7">
//           <div className="mb-3 flex items-center gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
//               <Pizza size={25} />
//             </div>

//             <div>
//               <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
//                 Add Menu Item
//               </h1>

//               <p className="mt-1 text-sm text-gray-500">
//                 Add a delicious item to your restaurant menu.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Form Card */}
//         <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
//           <div className="border-b border-gray-100 px-5 py-5 sm:px-8">
//             <h2 className="text-lg font-bold text-gray-800">
//               Menu Information
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Fill in the details below to create a new menu item.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-8">
//             {/* Item Name */}
//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700">
//                 Item Name <span className="text-red-500">*</span>
//               </label>

//               <input
//                 type="text"
//                 name="itemName"
//                 placeholder="e.g. Margherita Pizza"
//                 required
//                 maxLength={100}
//                 className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-gray-800 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
//               />
//             </div>

//             {/* Category */}
//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700">
//                 Category <span className="text-red-500">*</span>
//               </label>

//               <div className="relative">
//                 <Utensils
//                   size={17}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                 />

//                 <select
//                   name="category"
//                   required
//                   defaultValue=""
//                   className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
//                 >
//                   <option value="" disabled>
//                     Select a category
//                   </option>

//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700">
//                 Description <span className="text-red-500">*</span>
//               </label>

//               <div className="relative">
//                 <FileText
//                   size={17}
//                   className="absolute left-4 top-4 text-gray-400"
//                 />

//                 <textarea
//                   name="description"
//                   rows={5}
//                   required
//                   maxLength={1000}
//                   placeholder="Describe your delicious menu item..."
//                   className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
//                 />
//               </div>
//             </div>

//             {/* Price and Location */}
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-gray-700">
//                   Price (৳) <span className="text-red-500">*</span>
//                 </label>

//                 <div className="relative">
//                   <DollarSign
//                     size={17}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   />

//                   <input
//                     type="number"
//                     name="price"
//                     min="1"
//                     step="0.01"
//                     required
//                     placeholder="Enter price"
//                     className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-gray-700">
//                   Location <span className="text-red-500">*</span>
//                 </label>

//                 <div className="relative">
//                   <MapPin
//                     size={17}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   />

//                   <input
//                     type="text"
//                     name="location"
//                     required
//                     placeholder="Area / City"
//                     className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700">
//                 Item Image <span className="text-red-500">*</span>
//               </label>

//               {imagePreview ? (
//                 <div className="relative overflow-hidden rounded-2xl border border-gray-200">
//                   <img
//                     src={imagePreview}
//                     alt="Menu item preview"
//                     className="h-56 w-full object-cover sm:h-64"
//                   />

//                   <button
//                     type="button"
//                     onClick={removeImage}
//                     className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-md hover:bg-red-50"
//                     aria-label="Remove image"
//                   >
//                     <X size={19} />
//                   </button>

//                   <div className="bg-white px-4 py-3 text-sm font-medium text-gray-600">
//                     {image?.name}
//                   </div>
//                 </div>
//               ) : (
//                 <label
//                   htmlFor="itemImage"
//                   className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/70 px-4 py-8 text-center transition hover:border-red-400 hover:bg-red-50/40"
//                 >
//                   <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
//                     <ImagePlus size={25} />
//                   </div>

//                   <p className="text-sm font-semibold text-gray-700">
//                     Click to upload an image
//                   </p>

//                   <p className="mt-1 text-xs text-gray-400">
//                     PNG, JPG or WEBP (Maximum 5MB)
//                   </p>
//                 </label>
//               )}

//               <input
//                 id="itemImage"
//                 type="file"
//                 accept="image/png,image/jpeg,image/webp"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>

//             {/* Plan Notice */}
//             <div className="flex gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
//               <AlertCircle
//                 size={20}
//                 className="mt-0.5 shrink-0 text-orange-500"
//               />

//               <div>
//                 <p className="text-sm font-bold text-gray-800">
//                   Free Plan: 3 Menu Items
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
//                   Pending and Approved items count toward your Free Plan limit.
//                   Rejected items do not count.
//                 </p>
//               </div>
//             </div>

//             {/* Response Message */}
//             {message.text && (
//               <div
//                 className={`flex items-start gap-2 rounded-xl p-4 text-sm ${
//                   message.type === "success"
//                     ? "border border-green-200 bg-green-50 text-green-700"
//                     : "border border-red-200 bg-red-50 text-red-600"
//                 }`}
//               >
//                 {message.type === "success" ? (
//                   <CheckCircle2 size={19} className="shrink-0" />
//                 ) : (
//                   <AlertCircle size={19} className="shrink-0" />
//                 )}

//                 <p>{message.text}</p>
//               </div>
//             )}

//             {/* Buttons */}
//             <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
//               <button
//                 type="reset"
//                 disabled={loading}
//                 onClick={() => {
//                   setImage(null);
//                   setImagePreview(null);
//                   setMessage({ type: "", text: "" });
//                 }}
//                 className="h-12 rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
//               >
//                 Reset Form
//               </button>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-7 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 size={18} className="animate-spin" />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Plus size={19} />
//                     Submit Menu Item
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         <p className="mt-5 text-center text-xs text-gray-400">
//           Make your menu delicious and attract more customers.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AddMenuItemPage;

// ****************************************************
// ****************************************************
// ****************************************************
// ****************************************************
// ****************************************************
// ****************************************************

"use client";

import React, { FormEvent, useEffect, useState } from "react";
import {
  Pizza,
  ImagePlus,
  X,
  Loader2,
  Plus,
  CheckCircle2,
  AlertCircle,
  MapPin,
  DollarSign,
  Utensils,
  FileText,
} from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { useSession } from "@/lib/auth-client";

const categories = [
  "Pizza",
  "Burger",
  "Pasta",
  "Sandwich",
  "Chicken",
  "Seafood",
  "Dessert",
  "Drinks",
  "Other",
];

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Get vendor premium status
const getUserPremiumById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/premium`);

  if (!response.ok) {
    throw new Error("Failed to check premium status.");
  }

  return response.json();
};

const AddMenuItemPage = () => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isPremium, setIsPremium] = useState(false);
  const [checkingPremium, setCheckingPremium] = useState(true);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // Check premium status from MongoDB
  useEffect(() => {
    let isMounted = true;

    const checkPremium = async () => {
      const userId = session?.user?.id;

      if (!userId) {
        setCheckingPremium(false);
        return;
      }

      try {
        const data = await getUserPremiumById(userId);

        if (isMounted) {
          setIsPremium(data.result?.premium === true);
        }
      } catch (error) {
        console.error("Premium check error:", error);

        if (isMounted) {
          setMessage({
            type: "error",
            text: "Could not check your subscription status.",
          });
        }
      } finally {
        if (isMounted) {
          setCheckingPremium(false);
        }
      }
    };

    checkPremium();

    return () => {
      isMounted = false;
    };
  }, [session?.user?.id]);

  // Image preview cleanup
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Please select a valid image file.",
      });

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Image size must be less than 5MB.",
      });

      e.target.value = "";
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setMessage({ type: "", text: "" });
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage({ type: "", text: "" });

    if (!image) {
      setMessage({
        type: "error",
        text: "Please upload an item image.",
      });
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

      const imgbbKey = process.env.NEXT_PUBLIC_IMGBB;

      if (!apiUrl || !imgbbKey) {
        throw new Error("API configuration is missing.");
      }

      const form = e.currentTarget;
      const formData = new FormData(form);

      // Upload image to ImgBB
      const imageData = new FormData();
      imageData.append("image", image);

      const imageResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        {
          method: "POST",
          body: imageData,
        },
      );

      const imageResult = await imageResponse.json();

      if (!imageResponse.ok || !imageResult.success) {
        throw new Error("Image upload failed.");
      }

      const imageUrl = imageResult.data.display_url;

      // Prepare menu item
      const menuItem = {
        itemName: formData.get("itemName"),
        category: formData.get("category"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        location: formData.get("location"),
        imageUrl,
      };

      // Get authentication token
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Please login again.");
      }

      // Send menu item to backend
      const response = await fetch(`${apiUrl}/usersvendor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(menuItem),
      });

      const result = await response.json();

      // Free plan limit reached
      if (response.status === 403 && result.limitReached) {
        window.location.href = "/dashboard/vendor/subscription";
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to add menu item.");
      }

      setMessage({
        type: "success",
        text: "Menu item submitted successfully! Waiting for admin approval.",
      });

      form.reset();
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] px-3 py-6 sm:px-6 sm:py-9 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-7">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <Pizza size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Add Menu Item
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Add a delicious item to your restaurant menu.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-5 sm:px-8">
            <h2 className="text-lg font-bold text-gray-800">
              Menu Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Fill in the details below to create a new menu item.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-8">
            {/* Item Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Item Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="itemName"
                placeholder="e.g. Margherita Pizza"
                required
                maxLength={100}
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-sm text-gray-800 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Utensils
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  name="category"
                  required
                  defaultValue=""
                  className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                >
                  <option value="" disabled>
                    Select a category
                  </option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <FileText
                  size={17}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <textarea
                  name="description"
                  rows={5}
                  required
                  maxLength={1000}
                  placeholder="Describe your delicious menu item..."
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                />
              </div>
            </div>

            {/* Price and Location */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price (৳) <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <DollarSign
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    name="price"
                    min="1"
                    step="0.01"
                    required
                    placeholder="Enter price"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Location <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="Area / City"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Item Image <span className="text-red-500">*</span>
              </label>

              {imagePreview ? (
                <div className="relative overflow-hidden rounded-2xl border border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Menu item preview"
                    className="h-56 w-full object-cover sm:h-64"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-md hover:bg-red-50"
                    aria-label="Remove image"
                  >
                    <X size={19} />
                  </button>

                  <div className="bg-white px-4 py-3 text-sm font-medium text-gray-600">
                    {image?.name}
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="itemImage"
                  className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/70 px-4 py-8 text-center transition hover:border-red-400 hover:bg-red-50/40"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <ImagePlus size={25} />
                  </div>

                  <p className="text-sm font-semibold text-gray-700">
                    Click to upload an image
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG or WEBP (Maximum 5MB)
                  </p>
                </label>
              )}

              <input
                id="itemImage"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Plan Notice */}
            <div
              className={`flex gap-3 rounded-xl border p-4 ${
                checkingPremium
                  ? "border-gray-200 bg-gray-50"
                  : isPremium
                    ? "border-green-200 bg-green-50"
                    : "border-orange-100 bg-orange-50"
              }`}
            >
              {checkingPremium ? (
                <Loader2
                  size={20}
                  className="mt-0.5 shrink-0 animate-spin text-gray-500"
                />
              ) : isPremium ? (
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-green-600"
                />
              ) : (
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-orange-500"
                />
              )}

              <div>
                <p className="text-sm font-bold text-gray-800">
                  {checkingPremium
                    ? "Checking Subscription..."
                    : isPremium
                      ? "Premium Plan: Unlimited Menu Items"
                      : "Free Plan: 3 Menu Items"}
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                  {checkingPremium
                    ? "Please wait while we check your subscription status."
                    : isPremium
                      ? "Your premium subscription is active. You can add unlimited menu items."
                      : "Pending and Approved items count toward your Free Plan limit. Rejected items do not count. Upgrade to Premium for unlimited menu items."}
                </p>
              </div>
            </div>

            {/* Response Message */}
            {message.text && (
              <div
                className={`flex items-start gap-2 rounded-xl p-4 text-sm ${
                  message.type === "success"
                    ? "border border-green-200 bg-green-50 text-green-700"
                    : "border border-red-200 bg-red-50 text-red-600"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 size={19} className="shrink-0" />
                ) : (
                  <AlertCircle size={19} className="shrink-0" />
                )}

                <p>{message.text}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="reset"
                disabled={loading}
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                  setMessage({ type: "", text: "" });
                }}
                className="h-12 rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Reset Form
              </button>

              <button
                type="submit"
                disabled={loading || checkingPremium}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-7 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Plus size={19} />
                    Submit Menu Item
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Make your menu delicious and attract more customers.
        </p>
      </div>
    </div>
  );
};

export default AddMenuItemPage;
