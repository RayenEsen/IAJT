import { Component, OnInit } from '@angular/core';
import { Ticket } from '../Shared/Ticket';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-Ticket',
  templateUrl: './Ticket.component.html',
  styleUrls: ['./Ticket.component.css']
})
export class TicketComponent implements OnInit {


  MenuItems = [
    {
        label: 'Documents',
        items: [
            {
                label: 'New',
                icon: 'pi pi-plus'
            },
            {
                label: 'Search',
                icon: 'pi pi-search'
            }
        ]
    },
    {
        label: 'Profile',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog'
            },
            {
              label: 'Modifier',
              icon: 'pi pi-eye',
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
            }
        ]
    }
];

TicketList: Ticket[] = [
  {
    id: 1,
    title: "Login Issue",
    description: "User cannot log into the system.",
    status: "Open",
    priority: "High",
    createdDate: new Date("2024-08-01"),
    updatedDate: new Date("2024-08-05"),
    assignedUser: "John Doe",
    category: "Bug",
    reporter: "Jane Smith",
    resume: "User login failure reported by Jane.",
    star: false
  },
  {
    id: 2,
    title: "Page Load Timeout",
    description: "The dashboard page takes too long to load.",
    status: "In Progress",
    priority: "Medium",
    createdDate: new Date("2024-08-02"),
    updatedDate: new Date("2024-08-06"),
    assignedUser: "Alice Johnson",
    category: "Performance",
    reporter: "Michael Brown",
    resume: "Page loading issue under investigation.",
    star: false
  },
  {
    id: 3,
    title: "Feature Request: Dark Mode",
    description: "Request to add a dark mode to the application.",
    status: "Open",
    priority: "Low",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mohsen",
    category: "Enhancement",
    reporter: "Emily Davis",
    resume: "New feature request for dark mode.",
    star: false
  },
  {
    id: 4,
    title: "Data Sync Error",
    description: "Data is not syncing correctly between systems.",
    status: "Closed",
    priority: "Critical",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "David Lee",
    category: "Integration",
    reporter: "Sarah White",
    resume: "Resolved sync error between databases.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
];

data : any = {
  labels: ['Category A', 'Category B', 'Category C', 'Category D'],
  datasets: [
    {
      data: [10, 20, 30, 40],  // Example static data
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0'
      ]
    }
  ]
};


data2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40, 70, 60, 50, 45, 80],
      fill: false,
      tension: 0.4
    },
    {
      label: 'Second Dataset',
      data: [28, 48, 40, 19, 86, 27, 90, 75, 65, 60, 55, 85],
      fill: false,
      tension: 0.4
    }
  ]
};



options: any = {
  plugins: {
    legend: {
      display: true,  // Ensure the legend is hidden
      position: 'right',  // Adjust the position if needed
      labels: {
        color: '#333',
        font: {
          size: 14
        }
      }
    },
}
};



PieShartOptions : string[] = ["Status","Priorite","Catégorie"]



  filteredbystar : boolean = false;
  ShowStaredTickets()
  {
    if(this.filteredbystar == false)
    {
      this.TicketList =  this.TicketList.filter(item => item.star === true)
      this.filteredbystar = true
    }
    else
    {
      this.Clear()
      this.filteredbystar = false
    }
  }


  constructor(private primengConfig: PrimeNGConfig) { }


  OriginalTicketList : Ticket [] = []
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.OriginalTicketList = this.TicketList;
  }


  Clear()
  {
    this.TicketList = this.OriginalTicketList
  }


  searchValue : string = ""
  Search2() {
    if (this.searchValue.trim() !== '') {
        // Filter the list based on the searchkey
        this.TicketList = this.TicketList.filter(item =>
            Object.values(item).some(val =>
                val !== null && val.toString().toLowerCase().includes(this.searchValue.toLowerCase())
            )
        );
        console.log(this.TicketList);
    }
  }

  PriorityStyle(priority: string): string {
    switch (priority) {
      case 'High':
        return '#C0392B'; // Subtle red for high priority
      case 'Medium':
        return '#D4AC0D'; // Soft gold for medium priority
      case 'Low':
        return '#27AE60'; // Muted green for low priority
      default:
        return '#BDC3C7'; // Light grey for unknown priorities
    }
  }


  getSeverity(status: string) {
    switch (status.toLowerCase()) {
        case 'open':
            return 'info';
        case 'in progress':
            return 'warning';
        case 'closed':
            return 'success';
        case 'on hold':
            return 'secondary';
        case 'escalated':
            return 'warning';
        case 'cancelled':
            return 'danger';
        default:
            return undefined;  // Handle unknown statuses
    }
}



  
  
  
}
