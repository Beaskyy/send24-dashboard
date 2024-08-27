import { associations } from "@/lib/data";
import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table";

const Orders = () => {
  return (
    <main className="lg:mt-[52px] mt-8 lg:ml-10 lg:mr-9 mx-4">
      <div className="grid lg:grid-cols-5 gap-6 mb-6">
        <div className="flex flex-col justify-center items-center border py-8 border-[#E6E6E6] rounded-2xl bg-white">
          <h4 className="mb-2">Total</h4>
          <h6>100</h6>
        </div>
        <div className="flex flex-col justify-center items-center border py-8 border-[#E6E6E6] rounded-2xl bg-white">
          <h4 className="mb-2">Total</h4>
          <h6>100</h6>
        </div>
        <div className="flex flex-col justify-center items-center border py-8 border-[#E6E6E6] rounded-2xl bg-white">
          <h4 className="mb-2">Total</h4>
          <h6>100</h6>
        </div>
        <div className="flex flex-col justify-center items-center border py-8 border-[#E6E6E6] rounded-2xl bg-white">
          <h4 className="mb-2">Total</h4>
          <h6>100</h6>
        </div>
        <div className="flex flex-col justify-center items-center border py-8 border-[#E6E6E6] rounded-2xl bg-white">
          <h4 className="mb-2">Total</h4>
          <h6>100</h6>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={associations}
        searchKey="name"
        tableName="Orders"
      />
    </main>
  );
};

export default Orders;
