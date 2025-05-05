import CreateHotelIdForm from '@/components/COMPANY_COMPONENTS/hotel-management/form/create-hotel-id-form';
import Navbar from '@/components/Navbar';

const ViewPendingHotelPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const mode = 'pending'; 

  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="flex justify-center items-center w-full px-4 md:px-8 py-10 mt-14">
        <CreateHotelIdForm hotelID={id} isEnabled={true} mode={mode} />
      </div>
    </div>
  );
};

export default ViewPendingHotelPage;
