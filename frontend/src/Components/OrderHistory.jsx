
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { formatPrice } from '../utils'; // Import formatPrice

export default function OrderHistory() {
    const { orders } = useContext(ShopContext);

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white dark:bg-gray-900 px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        No orders yet
                    </h2>
                    <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                        It looks like you haven't placed any orders yet. Start shopping to fill this up!
                    </p>
                    <div className="mt-10">
                        <Link
                            to="/"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="py-16 sm:py-24">
                <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">Order History</h1>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Check the status of recent orders, manage returns, and download invoices.
                        </p>
                    </div>

                    <div className="mt-16">
                        <h2 className="sr-only">Recent orders</h2>

                        <div className="space-y-20">
                            {orders.map((order) => (
                                <div key={order.id}>
                                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                                        <dl className="flex-auto space-y-6 divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-600 dark:text-gray-300 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                            <div className="flex justify-between sm:block">
                                                <dt className="font-medium text-gray-900 dark:text-white">Date placed</dt>
                                                <dd className="sm:mt-1">{order.date}</dd>
                                            </div>
                                            <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                                <dt className="font-medium text-gray-900 dark:text-white">Order number</dt>
                                                <dd className="sm:mt-1">{order.id}</dd>
                                            </div>
                                            <div className="flex justify-between pt-6 font-medium text-gray-900 dark:text-white sm:block sm:pt-0">
                                                <dt>Total amount</dt>
                                                <dd className="sm:mt-1">{order.total}</dd>
                                            </div>
                                        </dl>
                                        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:mt-0">
                                            <button
                                                onClick={() => {
                                                    // This would ideally open the specific invoice for this older order
                                                    import('../utils/invoiceGenerator').then(mod => mod.downloadInvoice(order));
                                                }}
                                                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition"
                                            >
                                                Invoice
                                            </button>
                                            <Link
                                                to="/order-tracking"
                                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto transition"
                                            >
                                                Track Order
                                            </Link>
                                        </div>
                                    </div>

                                    <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                        <caption className="sr-only">Products</caption>
                                        <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                                            <tr>
                                                <th scope="col" className="py-3 pr-8 font-normal dark:text-gray-400">
                                                    Product
                                                </th>
                                                <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell dark:text-gray-400">
                                                    Price
                                                </th>
                                                <th scope="col" className="hidden py-3 font-normal sm:table-cell dark:text-gray-400">
                                                    Status
                                                </th>
                                                <th scope="col" className="w-0 py-3 font-normal dark:text-gray-400 text-right">
                                                    Info
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700 text-sm sm:border-t">
                                            {order.items.map((item) => (
                                                <tr key={item.name}>
                                                    <td className="py-6 pr-8">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="mr-6 h-16 w-16 rounded object-cover object-center"
                                                            />
                                                            <div>
                                                                <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                                                                <div className="mt-1 sm:hidden">{item.price}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="hidden py-6 pr-8 sm:table-cell dark:text-gray-300">{formatPrice(item.price)}</td>
                                                    <td className="hidden py-6 sm:table-cell">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`inline-block h-2 w-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' :
                                                                order.status === 'Processing' ? 'bg-yellow-500' : 'bg-blue-500'
                                                                }`} />
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                                            <div
                                                                className={`h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-500 w-full' :
                                                                    order.status === 'Processing' ? 'bg-yellow-500 w-1/3' : 'bg-blue-500 w-2/3'
                                                                    }`}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap py-6 text-right font-medium">
                                                        <Link
                                                            to={`/product/${item.id}`} // Assuming item.id exists and links to product
                                                            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline"
                                                        >
                                                            Buy Again
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
