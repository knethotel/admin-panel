import CreateHotelIdForm from '@/components/COMPANY_COMPONENTS/hotel-management/form/create-hotel-id-form';
import Navbar from '@/components/Navbar';

const ViewPendingHotelPage = async ({ params }: { params: { id: string } }) => {
  const mode = 'pending'; // force this for pending-specific view
  const id = params.id;

  return (
    <div className="flex flex-col w-full">
      <Navbar className="relative w-full lg:w-full" />
      <div className="flex justify-center items-center w-full px-4 md:px-8 py-10">
        <CreateHotelIdForm hotelID={id} isEnabled={true} mode={mode} />
      </div>
    </div>
  );
};

export default ViewPendingHotelPage;
