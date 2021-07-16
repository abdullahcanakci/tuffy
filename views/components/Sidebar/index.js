import QuickLink from "./QuickLink";
import Folder from "./Folder";
import styles from "./index.module.scss";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { Book, Bell, CheckSquare, Edit3, Heart, X } from "react-feather";
import { useTags } from "hooks";
import { Spinner } from "..";

const Sidebar = () => {
  const quickLinks = [
    { name: "All Notes", icon: <Book /> },
    { name: "Reminders", icon: <Bell /> },
    { name: "Tasks", icon: <CheckSquare /> },
    { name: "Favorites", icon: <Heart /> },
    { name: "Hightlights" },
  ];

  const { tags, tagsLoading, createTag, deleteTag } = useTags();

  const onNewEntry = (value) => {
    createTag(value);
  };

  return (
    <div className={styles.sidebar}>
      <nav>
        <Section>
          <SectionTitle title="Quick Links" />
          <ul>
            {quickLinks.map((link) => (
              <QuickLink content={link} key={link.name} />
            ))}
          </ul>
        </Section>
        <Section>
          <SectionTitle title="Tags" onNewEntry={onNewEntry} />
          {tagsLoading ? (
            <Spinner />
          ) : (
            <ul>
              {tags.map((link) => (
                <QuickLink
                  content={link}
                  key={link.id}
                  actions={[
                    {
                      label: "Delete",
                      onClick: () => deleteTag(link.id),
                      icon: <X />,
                    },
                  ]}
                />
              ))}
            </ul>
          )}
        </Section>
      </nav>
    </div>
  );
};

export default Sidebar;
