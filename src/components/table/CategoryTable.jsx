import { Edit, Trash } from 'lucide-react'
import { Button } from '../Button'
import { useState } from 'react'
import { CategoryForm } from '../form/CategoryForm'

export const CategoryTable = ({ data, onDelete, onAdd, onEdit }) => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const onSelectedCategory = (id, entity) => {
    const selectedCategory = data.find(category => category.id === id)
    if (entity === 'edit') {
      setSelectedItem(selectedCategory)
      setIsShowModal(true)
    } else {
      onDelete(selectedCategory.id)
    }
  }

  const handleAdd = param => {
    onAdd(param)
  }

  const handleEdit = param => {
    onEdit(param)
  }

  // console.log(selectedItem)

  return (
    <>
      {isShowModal && (
        <CategoryForm
          setValue={setSelectedItem}
          value={selectedItem}
          setIsShowModal={setIsShowModal}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          isShowModal={isShowModal}
        />
      )}

      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold'>Category Management</h1>
        <Button
          onClick={() => {
            setIsShowModal(true)
            setSelectedItem({})
          }}
        >
          Add new category
        </Button>
      </div>
      <div className='flex justify-center my-5 border-b-2 bg-white shadow-md rounded-xl'>
        <div className='flex flex-col items-center justify-center w-full'>
          <table className='w-full overflow-scroll'>
            <thead>
              <tr className='bg-blue-gray-100 text-gray-700 border-t'>
                <th className='py-3 px-4 text-left'>Id </th>
                <th className='py-3 px-4 text-left'>Name</th>
                <th className='py-3 px-4 text-left'>Code</th>
                <th className='py-3 px-4 text-left w-40'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-blue-gray-900'>
              {data?.length ? (
                <>
                  {data?.map(category => (
                    <tr key={category.id} className='border border-b'>
                      <td className='px-3 py-4 '>{category.id}</td>
                      <td className='px-3 py-4'>{category.name}</td>
                      <td className='px-3 py-4'>{category.code}</td>
                      <td className='px-3 py-4'>
                        <Button
                          onClick={() =>
                            onSelectedCategory(category.id, 'edit')
                          }
                          className='mr-2 text-blue-400'
                          variant='icon'
                        >
                          <Edit />
                        </Button>

                        <Button
                          onClick={() =>
                            onSelectedCategory(category.id, 'delete')
                          }
                          className='text-rose-500'
                          variant='icon'
                        >
                          <Trash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className='border border-b text-center text-3xl'>
                  <td colSpan='5' className='py-4'>
                    No category data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
