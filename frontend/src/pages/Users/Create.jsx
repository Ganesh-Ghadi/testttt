import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.coerce
    .number()
    .min(1000000000, {
      message: 'Mobile number must be at least 10 digits long.',
    }) // Ensure the number is 10 digits or longer
    .max(9999999999, {
      message: 'Mobile number must be exactly 10 digits long.',
    }), // Ensure the number is 10 digits or shorter
  role: z.string().min(1, 'Role field is required'),
  active: z.coerce.number().optional(),
});
const Create = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const navigate = useNavigate();
  const defaultValues = {
    email: '',
    password: '',
    name: '',
    mobile: '',
    role: '',
    active: "1",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema), defaultValues });

  const storeMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/profiles',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the Bearer token
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('User Created Successfully');
      navigate('/users');
    },
    onError: (error) => {
      console.log('got error ', error);
    },
  });
  const onSubmit = (data) => {
    storeMutation.mutate(data);
  };

  return (
    <>
      {/* breadcrumb start */}
      <div className=" mb-11 text-sm">
        <div className="flex items-center space-x-2 text-gray-700">
          <span className="cursor-pointer text-blue-500 hover:font-medium hover:border-b border-black">
            Users
          </span>
          <span className="text-gray-400">/</span>
          <span className="">Add</span>
        </div>
      </div>
      {/* breadcrumb ends */}

      {/* form style strat */}
      <div className="px-5 pb-7 pt-1 w-full bg-white shadow-lg border  rounded-md">
        <div className="w-full p-3 flex justify-start items-center">
          <h2 className="text-lg font-normal"> Add Users</h2>
        </div>
        {/* row starts */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-4 grid grid-cols-3 gap-4">
            <div className="">
              <Label className="font-normal" htmlFor="name">
                Name: <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    className="mt-1"
                    type="text"
                    placeholder="Enter name"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="">
              <Label className="font-normal" htmlFor="email">
                Email: <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    className="mt-1"
                    type="email"
                    placeholder="Enter email"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="">
              <Label className="font-normal" htmlFor="password">
                Password: <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    className="mt-1"
                    placeholder="Enter password"
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          {/* row ends */}
          {/* row starts */}
          <div className="w-full grid grid-cols-3 gap-3">
            <div className="">
              <Label className="font-normal" htmlFor="mobile">
                Mobile:
              </Label>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="mobile"
                    className="mt-1"
                    type="number"
                    placeholder="Enter mobile"
                  />
                )}
              />
              {errors.mobile && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.mobile.message}
                </p>
              )}
            </div>
            <div className="">
              <Label className="font-normal" htmlFor="role">
                Role: <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select role</SelectLabel>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.role.message}
                </p>
              )}
            </div>
            <div className="">
              <Label className="font-normal" htmlFor="active">
                Active: <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Status</SelectLabel>
                        <SelectItem value={String(1)}>Active</SelectItem>
                        <SelectItem value={String(0)}>Inactive</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.active && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.active.message}
                </p>
              )}
            </div>
          </div>
          {/* row ends */}
          <div className="w-full gap-4 mt-4 flex justify-end items-center">
            <Button
              type="button"
              className=" shadow-xl bg-red-500 hover:bg-red-600"
              onClick={() => navigate('/users')}
            >
              Cancle
            </Button>

            <Button
              type="submit"
              disabled={storeMutation.isLoading}
              className="shadow-xl bg-green-500 hover:bg-green-600"
            >
              {storeMutation.isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
