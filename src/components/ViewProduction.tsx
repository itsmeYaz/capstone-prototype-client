import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.jsx'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button.tsx'
import { Plus, Trash } from 'lucide-react'
import { Coffee } from 'lucide-react'

interface Harvest {
  date: string
  quantity: number
  id: string
}

interface ProductionData {
  cropPlanted: string
  datePlanted: string
  areaPlanted: number
  existence: string
  dateHarvest: string
  status: string
  harvests: Harvest[]
}

const defaultData: ProductionData = {
  cropPlanted: '',
  datePlanted: '',
  areaPlanted: 0,
  existence: '',
  dateHarvest: '',
  status: '',
  harvests: [],
}

const ViewProduction = () => {
  const [data, setData] = useState<ProductionData>(defaultData)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const {
    cropPlanted,
    datePlanted,
    areaPlanted,
    existence,
    dateHarvest,
    status,
    harvests,
  } = data

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`https://capstone.prototype.nielmascarinas.me/api/production/${id}`)
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
      })
      .finally(() => {
        setIsLoading(false) // Set loading to false when the fetch completes
      })
  }, [])

  if (isLoading) {
    return (
      <div className="flex">
        Preparing production, let's have a coffee...
        <Coffee />
      </div>
    )
  }

  function handleDelete(id) {
    axios
      .delete(`https://capstone.prototype.nielmascarinas.me/api/harvest/${id}`)
      .then(() => {
        // Create a new array that does not include the deleted item
        const updatedHarvests = data.harvests.filter((item) => item.id !== id)

        // Update the state with a new object that includes the updated array
        setData({ ...data, harvests: updatedHarvests })
      })
      .catch((error) => {
        console.error('Error deleting data: ', error)
      })
  }

  console.log(data)
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Crop</TableHead>
            <TableHead>DatePlanted</TableHead>
            <TableHead>AreaPlanted</TableHead>
            <TableHead>Existence</TableHead>
            <TableHead>DateHarvest</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{cropPlanted}</TableCell>
            <TableCell>
              {new Date(datePlanted).toLocaleDateString('en-GB', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </TableCell>
            <TableCell>{areaPlanted} m&sup2;</TableCell>
            <TableCell>{existence}</TableCell>
            <TableCell>
              {new Date(dateHarvest).toLocaleDateString('en-GB', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>
              <Button asChild>
                <Link to={`/create/${id}`}>
                  <Plus size={14} />
                  Harvest
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableCaption>Harvest History</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date Harvest</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {harvests &&
            harvests.map((harvest, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(harvest.date).toLocaleDateString('en-GB', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>{harvest.quantity}</TableCell>
                <Button asChild className="mx-2" variant="secondary" size="sm">
                  <Link to={`/update/${harvest.id}`}>Update</Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash size={14} className="mr-0.5" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the harvest and remove harvest data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(harvest.id)}
                      >
                        Yes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ViewProduction
