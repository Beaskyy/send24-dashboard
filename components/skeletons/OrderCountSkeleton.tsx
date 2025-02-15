// import React from 'react'
// import { Skeleton } from '../ui/skeleton'

// export const OrderCountSkeleton = () => {
//   return (
//     <div className="grid lg:grid-cols-6 grid-cols-2 gap-6 mb-6">
//       <div className="flex flex-col justify-center items-center py-8 card">
//         <h4 className="mb-2 text-[#15103d]">Total</h4>
//         {loading ? (
//           <Skeleton className="w-10 h-6" />
//         ) : (
//           <h6 className="font-medium">{orderCount?.total}</h6>
//         )}
//       </div>
//       <div className="flex flex-col justify-center items-center py-8 card">
//         <h4 className="mb-2 text-[#059669]">Completed</h4>
//         {loading ? (
//           <Skeleton className="w-10 h-6" />
//         ) : (
//           <h6 className="font-medium">{orderCount?.completed}</h6>
//         )}
//       </div>
//       <div className="flex flex-col justify-center items-center py-8 card">
//         <h4 className="mb-2 text-[#E87000]">Pending</h4>
//         {loading ? (
//           <Skeleton className="w-10 h-6" />
//         ) : (
//           <h6 className="font-medium">{orderCount?.pending}</h6>
//         )}
//       </div>
//       <div className="flex flex-col justify-center items-center py-8 card">
//         <h4 className="mb-2 text-[#9fe800]">Accepted</h4>
//         {loading ? (
//           <Skeleton className="w-10 h-6" />
//         ) : (
//           <h6 className="font-medium">{orderCount?.accepted}</h6>
//         )}
//       </div>
//       <div className="flex flex-col justify-center items-center py-8 card">
//         <h4 className="mb-2 text-[#00a6e8]">Transit</h4>
//         {loading ? (
//           <Skeleton className="w-10 h-6" />
//         ) : (
//           <h6 className="font-medium">{orderCount?.transit}</h6>
//         )}
//       </div>
//       <div className="flex flex-col justify-center items-center py-8 card">
//         <h4 className="mb-2 text-[#DC1515]">Cancelled</h4>
//         {loading ? (
//           <Skeleton className="w-10 h-6" />
//         ) : (
//           <h6 className="font-medium">{orderCount?.cancelled}</h6>
//         )}
//       </div>
//     </div>
//   )
// }
