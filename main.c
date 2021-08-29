#include "fcgi_stdio.h" /* fcgi library; put it first*/
#include <stdlib.h>


/*
Require for testing all functions in this module
#define TESTING_ALL_FUNCTION*/

/* In bytes */
#define BLOCK_SIZE 64

#define FILEPATH_SQL_RESULT "/tmp/sql-out.text"
#define FILEPATH_STATIC_INDEX_HTML "/var/www/solarsys/static/index.html"

#define ERROR_NOT_OPEN_FILE 1
#define ERROR_NOT_READ_FILE 2

/* Return pointer to string */
char *GetDataFromSQLFile(char *fileName)
{
/* Open result file SQL-request */
	FILE *sql = fopen(fileName, "r");
	char *data = NULL;

	if (!sql)
	{
		printf("Error: not open file result sql request\n");
		exit(ERROR_NOT_OPEN_FILE);
	}

/* Read opened file */
	char symbol;
	int i = 0; /* Count geted symbols */
	int numberBlock = 0;
	while(!feof(sql))
	{
		symbol = fgetc(sql);

		if (i % BLOCK_SIZE == 0)
		{
			numberBlock++;

			data = (char *)realloc(data, numberBlock * BLOCK_SIZE);
		}

		data[i++] = symbol;
	}

	fclose(sql);

	return data;
}

void PutElementsInSidebar()
{
	printf("\t<a class=\"row\" href=\"\">\n");
	printf("\t\t<img src=\"index_files/unknow.png\">\n");
	printf("\t\t<div class=\"name\">Тестирование элемента</div>\n");
	printf("\t</a>\n");
}

int strcmp(char *a, char *b)
{
	for (int i = 0; ; i++)
	{
		if (a[i] == b[i])
			continue;

		return a[i] > b[i] ? 1 : -1;
	}

	return 0;
}

/*
Generating dynamic html page function
Returned 0 if it's ok */
char GenDynHtml(FILE *staticHtml)
{
	char line[256];

	while(!feof(staticHtml))
	{
		fgets(line, 256, staticHtml);

		if (ferror(staticHtml))
			exit(ERROR_NOT_READ_FILE);

		if (!strcmp(line, "<!-- dynamic elements -->\n"))
		{
			PutElementsInSidebar();
			continue;
		}

		printf(line); printf("\n");
	}

	return 0;
}



#ifndef TESTING_ALL_FUNCTION
/* Get data from file created SQL-request and generation dynamic html page */
int main()
{
/* Response loop. */
	while (FCGI_Accept() >= 0)
	{
		char *dbString = GetDataFromSQLFile(FILEPATH_SQL_RESULT);

		/* HTML static file from /var/www/solarsys/static/ */
		FILE *staticHtml = fopen(FILEPATH_STATIC_INDEX_HTML, "r");

		if (staticHtml == NULL)
		{
			printf("Error: not open file static html");
			return ERROR_NOT_OPEN_FILE;
		}

		printf("Content-type:text/html\n");

		GenDynHtml(staticHtml);

		fclose(staticHtml);
	}

	return 0;
}
#else
int main()
{
	return 0;
}
#endif