import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateUserMutation } from "@/api/mutations";
import { useGetProfileQuery } from "@/api/queries";
import { useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const updateSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email"),
  mobileNumber: z.string().min(10, "Mobile number required"),
  deviceName: z.string().min(2, "Device name is required"),
  // address: z.string(),
  // language: z.string(),
  // ipAddress: z.string(),
  // osVersion: z.string(),
  riskLevel: z.string(),
  threatsDetected: z.string(),
  complianceStatus: z.string(),
});

type UpdateFormValues = z.infer<typeof updateSchema>;

export default function UpdateProfile() {
  const { mutateAsync } = useUpdateUserMutation();
  const { data: profile, isLoading } = useGetProfileQuery();
  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      mobileNumber: profile?.mobileNumber || "",
      deviceName: profile?.deviceName || "",
      // address: profile?.address || "",
      // language: profile?.language || "",
      // ipAddress: profile?.ipAddress || "",
      // osVersion: profile?.osVersion || "",
      riskLevel: profile?.riskLevel || "",
      threatsDetected: profile?.threatsDetected || "",
      complianceStatus: profile?.complianceStatus || "",
    },
  });

  // Update form values when profile data loads
  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name || "",
        email: profile.email || "",
        mobileNumber: profile.mobileNumber || "",
        deviceName: profile.deviceName || "",
        // address: profile.address || "",
        // language: profile.language || "",
        // ipAddress: profile.ipAddress || "",
        // osVersion: profile.osVersion || "",
        riskLevel: profile.riskLevel || "",
        threatsDetected: profile.threatsDetected || "",
        complianceStatus: profile.complianceStatus || "",
      });
    }
  }, [profile, form]);

  async function onSubmit(values: UpdateFormValues) {
    try {
      // Dynamically get OS version
      const userAgent = window.navigator.userAgent;
      const osVersion = userAgent.match(/\(([^)]+)\)/)?.[1] || "Unknown OS";
      await mutateAsync({
        ...values,
        osVersion,
        address: profile?.address || "",
        language: profile?.language || "",
      });
      // Optionally show success message or redirect
    } catch (error) {
      if (error instanceof Error) {
        form.setError("root", {
          type: "manual",
          message: error.message,
        });
      }
    }
  }

  if (isLoading) {
    return (
      <Card className="rounded border-0 px-8 py-14 max-w-xl mx-auto mt-10 animate-pulse">
        <CardContent>
          <div className="mb-8">
            <div className="mb-5 h-8 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="space-y-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded" />
            ))}
            <div className="h-10 bg-gray-200 rounded w-full mt-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded border-0 px-8 py-14 max-w-xl mx-auto mt-10">
      <CardContent>
        <div className="mb-8">
          <div className="flex items-center mb-5">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => window.history.back()}
              aria-label="Go back"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <span className="font-semibold text-3xl tracking-tight">
              Update Profile
            </span>
          </div>
        </div>
        <Form {...form}>
          <form
            className="space-y-6"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Full Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      type="email"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Mobile Number"
                      type="tel"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Device Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* 
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Language" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* Removed IP Address and OS Version fields */}

            <FormField
              control={form.control}
              name="riskLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Level</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Risk Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="threatsDetected"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Threats Detected</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Threats Detected" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complianceStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compliance Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Compliance Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full">Full</SelectItem>
                        <SelectItem value="Partial">Partial</SelectItem>
                        <SelectItem value="Non">Non</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <div className="text-red-500 text-sm">
                {form.formState.errors.root.message}
              </div>
            )}

            <LoadingButton
              className="h-10 w-full rounded font-semibold"
              isLoading={form.formState.isSubmitting}
              size="lg"
              type="submit"
            >
              Update Profile
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
