import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { useRegisterMutation } from "@/api/mutations";
import { LoadingButton } from "@/components/ui/loading-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/utils/errorMessage";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  mobileNumber: z
    .string()
    .min(10, "Mobile number is required")
    .regex(/^\d{10,15}$/, "Enter a valid mobile number"),
  email: z.email(),
  //   password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      email: "",
      //   password: "",
    },
  });

  const { mutateAsync } = useRegisterMutation();

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await mutateAsync({
        name: values.name,
        mobileNumber: values.mobileNumber,
        email: values.email,
        // password: values.password,
      });
      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Card className="rounded border-0 px-8 py-14">
      <CardContent>
        <div className="mb-8">
          <div className="mb-5 font-semibold text-4xl tracking-tight">LOGO</div>
          <div className="font-semibold text-xl">Create your account</div>
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
                  <FormLabel className="font-medium text-sm">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="name"
                      className="h-10 rounded bg-accent"
                      placeholder="Varun"
                      type="text"
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
                  <FormLabel className="font-medium text-sm">
                    Mobile Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="tel"
                      className="h-10 rounded bg-accent"
                      placeholder="7983270583"
                      type="tel"
                    />
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
                  <FormLabel className="font-medium text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="email"
                      className="h-10 rounded bg-accent"
                      placeholder="varun@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      className="h-10 rounded bg-accent"
                      placeholder="Password123@"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
              REGISTER
            </LoadingButton>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                className="font-medium text-primary hover:underline focus:underline focus:outline-none"
                to="/login"
              >
                Log in
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
