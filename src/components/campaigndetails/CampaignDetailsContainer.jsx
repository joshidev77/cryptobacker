import React, { useState } from 'react'
import CampaignDetails from './CampaignDetails'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';

const CampaignDetailsContainer = () => {
  const [isexpanded,setisexpanded] = useState(false);
  const [isAdmin,setisAdmin] = useState(false);
  const [amount,setAmount] = useState('');
  const [donors,setdonors] = useState([
    {
      id: 1,
      name: "Neil Sims",
      email: "email@flowbite.com",
      amount: "$320",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Bonnie Green",
      email: "email@flowbite.com",
      amount: "$3467",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Michael Gough",
      email: "email@flowbite.com",
      amount: "$67",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Thomas Lean",
      email: "email@flowbite.com",
      amount: "$2367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Lana Byrd",
      email: "email@flowbite.com",
      amount: "$367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Thomas Lean",
      email: "email@flowbite.com",
      amount: "$2367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Lana Byrd",
      email: "email@flowbite.com",
      amount: "$367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Thomas Lean",
      email: "email@flowbite.com",
      amount: "$2367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Lana Byrd",
      email: "email@flowbite.com",
      amount: "$367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Thomas Lean",
      email: "email@flowbite.com",
      amount: "$2367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Lana Byrd",
      email: "email@flowbite.com",
      amount: "$367",
      imageSrc: "https://images.unsplash.com/photo-1650934556718-6f808b6dac1d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ])
  const totalRaised = 1249.99; // Example value, can be dynamic
  const goal = 2000; // Example goal, can be dynamic
  const topDonor = donors.reduce((prev, current) =>
    parseFloat(current.amount.replace('$', '')) > parseFloat(prev.amount.replace('$', ''))
      ? current
      : prev
  );
  const averageDonation = (totalRaised / donors.length).toFixed(2);
  const orders = [
    {
      transaction: 'Payment from Bonnie Green',
      date: 'Apr 23, 2021',
      amount: '$2300',
      status: 'Completed',
    },
    {
      transaction: 'Payment refund to #00910',
      date: 'Apr 23, 2021',
      amount: '-$670',
      status: 'Completed',
    },
    {
      transaction: 'Payment failed from #087651',
      date: 'Apr 18, 2021',
      amount: '$234',
      status: 'Cancelled',
    },
    {
      transaction: 'Payment failed from #087651',
      date: 'Apr 18, 2021',
      amount: '$234',
      status: 'Cancelled',
    },
    {
      transaction: 'Payment failed from #087651',
      date: 'Apr 18, 2021',
      amount: '$234',
      status: 'Cancelled',
    },
    {
      transaction: 'Payment failed from #087651',
      date: 'Apr 18, 2021',
      amount: '$234',
      status: 'Cancelled',
    },
    {
      transaction: 'Payment failed from #087651',
      date: 'Apr 18, 2021',
      amount: '$234',
      status: 'Cancelled',
    },
  ];
  const {id} = useParams();

    const handleclick = (e) => {
      if(e.target.name == "pay"){
        if(amount > 0 && !isNaN(amount)){
          // add pay function here
        }
        else{
          toast.error('Enter Valid Amount','warn');   
        }
      }
      setisexpanded(!isexpanded)
    }

    const handleInputChange = (e) => {
      setAmount(e.target.value);
    };

    return (
    <div>
      <CampaignDetails
      id={id}
      handleClick={handleclick}
      isexpanded={isexpanded}
      amount={amount}
      handleInputChange={handleInputChange}
      isAdmin={isAdmin}
      donors={donors}
      totalRaised={totalRaised}
      goal={goal}
      topDonor={topDonor}
      averageDonation={averageDonation}
      orders={orders}
      />
    </div>
  )
}

export default CampaignDetailsContainer
