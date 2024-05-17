import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
  date: z.string().transform((dateString) => new Date(dateString)),
  quantity: z
    .string()
    .transform((val) => Number(val))
    .refine((value) => value >= 0),
  productionId: z.string(),
})

const EditHarvest = () => {
  const { id } = useParams()
  const [data, setData] = useState({
    date: new Date().toISOString(),
    quantity: 0,
    productionId: '',
  })
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: data.date,
      quantity: data.quantity,
      productionId: data.productionId,
    },
  })

  useEffect(() => {
    axios
      .get(`https://capstone.prototype.nielmascarinas.me/api/harvest/${id}`)
      .then((res) => {
        console.log(res.data)
        setData({
          date: res.data.date,
          quantity: res.data.quantity,
          productionId: res.data.productionId,
        })
        form.reset({
          date: res.data.date,
          quantity: res.data.quantity.toString(),
          productionId: res.data.productionId,
        })
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
      })
  }, [])

  function onSubmit() {
    console.log('btn click')

    axios
      .put(
        `https://capstone.prototype.nielmascarinas.me/api/harvest/${id}`,
        data,
      )
      .then(() => {
        navigate(`/production/${data.productionId}`)
      })
      .catch((err) => console.log(err))
  }

  console.log(data)

  return (
    <div className="w-[70%] grid place-items-center mt-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setData((prevData) => ({
                        ...prevData,
                        date: e.target.value,
                      }))
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Enter the date of the harvest.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={data.quantity.toString()}
                    onChange={(e) => {
                      field.onChange(e)
                      setData((prevData) => ({
                        ...prevData,
                        quantity: Number(e.target.value),
                      }))
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Enter the quantity of the harvest.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default EditHarvest
