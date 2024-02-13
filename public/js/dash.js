
function openSidebar(){
    if(!sidebarOpen){
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen=true;
    }
}

function closeSidebar(){
    if(sidebarOpen){
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen=false;
    }
}
function toggleMenu(){
  const subMenu=document.querySelector('.sub-menu')
  subMenu.classList.toggle('active')
}


// Function to fetch the counts from the server
function fetchCounts() {
  fetch('/api/dashboard/counts')
    .then(response => response.json())
    .then(data => {
      // Update the counts in the DOM
      const studentCountElement = document.getElementById('student-count');
      studentCountElement.textContent = data.studentCount;

      const issueCountElement = document.getElementById('issue-count');
      issueCountElement.textContent = data.issueCount;

      const returnCountElement = document.getElementById('return-count');
      returnCountElement.textContent = data.returnCount;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}





/* charts starts */

/* bar chart starts */
var barChartOptions = {
    series: [{
    data: [10,8,6,4,2]
  }],
    chart: {
    type: 'bar',
    height: 350,
    toolbar:{
        show:false
    },
  },
  colors:[
    "#246dec",
    "#369752",
    "#cc3c43",
    "#f5b547",
    "4f35al"
  ],
  plotOptions: {
    bar: {
      distributed:true,
      borderRadius: 4,
      horizontal: false,
      columnWidth:"40%",
    }
  },
  dataLabels: {
    enabled: false
  },
  legend:{
    show:false
  },
  xaxis: {
    categories: ["Dopper","The Hobbit","TMB",'The Gold',"Lost City"],
  },
  yaxis:{
    title:{
        text:"Count"
    }
  }
  };

  var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
  barChart.render();

/* bar chart ends */

/* area chart starts */

 var areaChartOptions = {
    series: [{
    name: 'Issued Books',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'Returned Books',
    data: [11, 32, 45, 33, 34, 52, 41]
  }],
    chart: {
    height: 350,
    type: 'area',
    toolbar:{
        show:false
    },
  },
  colors:["#CF9FFF","#246dec"],
  dataLabels:{
    enabled:false,
  },
  stroke: {
    curve: 'smooth'
  },
  labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul"],
  markers: {
    size: 0
  },
  yaxis: [
    {
      title: {
        text: 'Issued Books',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Returned Books',
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  }
  };

  var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
  areaChart.render();

/* area chart ends */

/* charts ends */

// Function to render the publication table
const renderPublicationTable = (publications) => {
  const publicationTable = document.getElementById('publicationTable');
  publicationTable.innerHTML = '';

  publications.forEach((pubs) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pubs.articletitle}</td>
      <td>${pubs.subject}</td>
      <td>${pubs.abstract}</td>
      <td>${pubs.aauthorname}</td>
      <td>${pubs.contact}</td>
      <td>
        <button><a href="/admin/updatepub/${pubs._id}" class="editpub-button">Edit</a></button>
        <button class="deletepub-button" onclick="deletePublication('${pubs._id}')">Delete</button>
      </td>
    `;
    publicationTable.appendChild(row);
  });
};

// Delete Publication
const deletepub = async (pubId) => {
  try {
    const response = await fetch(`/admin/addpub/${pubId}`, {
      method: 'DELETE'
    });

    if (response.status === 204) {
      // Publication deleted successfully
      // Remove the publication row from the table
      const publicationRow = document.getElementById(`pub-${pubId}`);
      publicationRow.remove();
    } else {
      // Handle error response
      console.error(`Failed to delete publication. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to render the book table
const renderBookTable = (books) => {
  const bookTable = document.getElementById('bookTable');
  bookTable.innerHTML = '';

  books.forEach((book) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.booktitle}</td>
      <td>${book.genre}</td>
      <td>${book.isbn}</td>
      <td>${book.authorname}</td>
      <td>${book.summary}</td>
      <td>
        <button onclick="editBook('${book._id}')">Edit</button>
        <button onclick="deleteBook('${book._id}')">Delete</button>
      </td>
    `;
    bookTable.appendChild(row);
  });
};

// Delete Book
const deleteBook = async (bookId) => {
  try {
    const response = await fetch(`/admin/book/${bookId}`, {
      method: 'DELETE'
    });

    if (response.status === 204) {
      // Book deleted successfully
      // Remove the book row from the table
      const bookRow = document.getElementById(`book-${bookId}`);
      bookRow.remove();
    } else {
      // Handle error response
      console.error(`Failed to delete book. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to render the Student table
const renderStudentTable = (students) => {
  const studentTable = document.getElementById('studentTable');
  studentTable.innerHTML = '';

  students.forEach((studs) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${studs.studid}</td>
      <td>${studs.studname}</td>
      <td>${studs.department}</td>
      <td>${studs.year}</td>
      <td>${studs.email}</td>
      <td>${studs.studphno}</td>
      <td>
        <button><a href="/admin/updatestud/${studs._id}" class="editpub-button">Edit</a></button>
        <button class="deletepub-button" onclick="deletePublication('${studs._id}')">Delete</button>
      </td>
    `;
    studentTable.appendChild(row);
  });
};

// Delete Student
const deleteStud = async (StudId) => {
  try {
    const response = await fetch(`/admin/student/${StudId}`, {
      method: 'DELETE'
    });

    if (response.status === 204) {
      // Student deleted successfully
      // Remove the student row from the table
      const studentRow = document.getElementById(`stud-${StudId}`);
      studentRow.remove();
    } else {
      // Handle error response
      console.error(`Failed to delete student. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to render the Issue table
const renderIssueTable = (issues) => {
  const issueTable = document.getElementById('IssueTable');
  issueTable.innerHTML = '';

  issues.forEach((issue) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${issue.bbookid}</td>
      <td>${issue.sstudid}</td>
      <td>${issue.sstudname}</td>
      <td>${issue.issdate}</td>
      <td>${issue.retdate}</td>
      <td>${issue.status}</td>
      <td>
        <button><a href="/admin/updateissue/${issue._id}" class="edit-button">Edit</a></button>
        <button class="delete-button" onclick="deleteIssue('${issue._id}')">Delete</button>
        <button class="return-button" onclick="returnIssue('${issue._id}')">Return</button>
      </td>
    `;
    issueTable.appendChild(row);
  });
};



// Delete Issue
// Function to delete an issue
const deleteIssue = async (issueId) => {
  try {
    const response = await fetch(`/admin/issue/${issueId}`, { method: 'DELETE' });
    if (response.status === 204) {
      deleteRow(issueId); // Call the deleteRow function when the issue is successfully deleted
      renderIssueTable(issues); // Render the updated Issue table
    } else {
      console.error('Failed to delete issue');
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to delete the row from the Issue table after successful deletion
const deleteRow = (issueId) => {
  const row = document.querySelector(`#IssueTable tr[data-issue-id="${issueId}"]`);
  if (row) {
    row.remove();
  }
};


// Function to render the Return table
const renderReturnTable = (returnedBooks) => {
  const returnTable = document.getElementById('ReturnTable');
  returnTable.innerHTML = '';

  returnedBooks.forEach((book) => {
    if (book.status === 'Returned') {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.bbookid}</td>
        <td>${book.bbookname}</td>
        <td>${book.sstudid}</td>
        <td>${book.sstudname}</td>
        <td>${book.issdate}</td>
        <td>${book.retdate}</td>
        <td>${book.studphnoo}</td>
        <td>${book.status}</td>
        <td>
          <button><a href="/admin/updateissue/${book._id}" class="edit-button">Edit</a></button>
          <button class="delete-button" data-issue-id="${book._id}">Delete</button>
        </td>
      `;
      returnTable.appendChild(row);
    }
  });
};



// Get the search input element
const searchInput = document.getElementById('searchInput');

// Add an event listener for keyup event
searchInput.addEventListener('keyup', () => {
  // Retrieve the search query
  const query = searchInput.value.toLowerCase();

  // Get all table rows in the specified sections
  const rows = document.querySelectorAll('.diaplaytable tbody tr, .displaytable tbody tr, .diplaytable tbody tr,.dipaytable tbody tr,.dipatable tbody tr');

  // Iterate over each row and perform search
  rows.forEach((row) => {
    const cells = row.getElementsByTagName('td');
    let found = false;

    // Check if any cell contains the search query
    Array.from(cells).forEach((cell) => {
      const cellText = cell.textContent.toLowerCase();
      if (cellText.includes(query)) {
        found = true;
      }
    });

    // Show/hide row based on search result
    if (found) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});
  

/* search bar ends */