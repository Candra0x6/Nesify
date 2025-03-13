"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Percent, Ticket } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageInput } from "../inputs/image-input";
import Matic from "@/lib/conversion/matic";
import { useEffect } from "react";

const ticketFormSchema = z.object({
  name: z.string().min(2, {
    message: "Ticket name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  purchaseLimit: z.string().min(1, {
    message: "Purchase limit is required.",
  }),
  amount: z.string().min(1, {
    message: "Number of tickets is required.",
  }),
  royaltyFee: z.string().min(1, {
    message: "Royalty fee is required.",
  }),
  maxResalePrice: z.string().min(1, {
    message: "Maximum resale price is required.",
  }),
  priceMatic: z.string().min(1, {
    message: "Price in Matic is required.",
  }),
  maxResalePriceMatic: z.string().min(1, {
    message: "Maximum resale price in Matic is required.",
  }),
  image: z.any(),
});

export type TicketFormSchema = z.infer<typeof ticketFormSchema>;
interface TicketFormProps {
  handleSubmit: (data: z.infer<typeof ticketFormSchema>) => void;
  onBack: () => void;
}

export default function TicketForm({ handleSubmit, onBack }: TicketFormProps) {
  const form = useForm<TicketFormSchema>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      price: "",
      purchaseLimit: "5",
      amount: "",
      priceMatic: "",
      maxResalePriceMatic: "",
      royaltyFee: "10",
      maxResalePrice: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ticketFormSchema>) => {
    handleSubmit(values);
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.1 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  useEffect(() => {
    const subscription = form.watch(async (value, { name }) => {
      if (name === "price") {
        const maticPrice = await Matic(Number(value.price) || 0);
        form.setValue("priceMatic", maticPrice, { shouldValidate: true });
      }
      if (name === "maxResalePrice") {
        const maticMaxResalePrice = await Matic(
          Number(value.maxResalePrice) || 0
        );
        form.setValue("maxResalePriceMatic", maticMaxResalePrice, {
          shouldValidate: true,
        });
      }
    });

    // Jangan lupa untuk unsubscribe saat komponen unmount
    return () => subscription.unsubscribe();
  }, [form]);
  return (
    <motion.div
      custom={0}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white/90">Ticket Details</CardTitle>
          <CardDescription className="text-white/60">
            Define the ticket options for your event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">
                        Ticket Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Ticket className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                          <Input
                            placeholder="VIP Access, General Admission, etc."
                            {...field}
                            className="pl-9 border-white/[0.08] bg-white/[0.03] text-white"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what this ticket includes..."
                          className="resize-none border-white/[0.08] bg-white/[0.03] text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Price</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-white/40">$</span>
                            </div>
                            <Input
                              type="number"
                              placeholder="99.99"
                              {...field}
                              className="pl-7 border-white/[0.08] bg-white/[0.03] text-white"
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-white/40">
                          The price of each ticket
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          Number of Tickets
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="100"
                            {...field}
                            className="border-white/[0.08] bg-white/[0.03] text-white"
                          />
                        </FormControl>
                        <FormDescription className="text-white/40">
                          Total available tickets
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="purchaseLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          Purchase Limit
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="5"
                            {...field}
                            className="border-white/[0.08] bg-white/[0.03] text-white"
                          />
                        </FormControl>
                        <FormDescription className="text-white/40">
                          Maximum tickets per buyer
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="royaltyFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          Royalty Fee
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="10"
                              {...field}
                              className="border-white/[0.08] bg-white/[0.03] text-white pr-8"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <Percent className="h-4 w-4 text-white/40" />
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-white/40">
                          Percentage fee on resales
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="maxResalePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">
                        Maximum Resale Price
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-white/40">$</span>
                          </div>
                          <Input
                            type="number"
                            placeholder="150.00"
                            {...field}
                            className="pl-7 border-white/[0.08] bg-white/[0.03] text-white"
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-white/40">
                        The maximum price tickets can be resold for
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">
                        Ticket Image
                      </FormLabel>
                      <FormControl>
                        <ImageInput formOnChange={onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="bg-white/[0.03] border border-white/[0.08] text-white/80 hover:bg-white/[0.05] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Event Details
                </Button>
                <Button
                  type="submit"
                  className="bg-white/[0.03] border border-white/[0.08] text-white/80 hover:bg-white/[0.05] hover:text-white"
                >
                  Continue to Review
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
