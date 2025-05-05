import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const FormWrapper = ({ title, children }: Props) => {
  return (
    <Card
      title={title}
      className="bg-[#FAF6EF] w-full shadow-custom border-none"
    >
      {/* <CardHeader className='py-0'>
        <Heading title={title} className='mb-0'/>
      </CardHeader> */}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormWrapper;
