import QuickLink from "./QuickLink";
import styles from "./index.module.scss";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { Book, Bell, CheckSquare, Heart, X } from "react-feather";
import { Spinner } from "..";
import { useSelector } from "react-redux";
import { tagsList } from "store/reducers/tagsSlice";
import { NetworkStates } from "store/states";
import { TagService } from "services";
import { FaTimes } from "react-icons/fa";
import { NoteService } from "services";
import Link from "next/link";

const Sidebar = () => {
  const tagsStatus = useSelector((state) => state.tags.status);
  const filter = useSelector((state) => state.notes.filter);
  const tags = useSelector(tagsList);

  const quickLinks = [
    {
      name: "All Notes",
      icon: <Book />,
      active: Object.keys(filter).length === 0,
      onClick: () => NoteService.filter({}, true),
    },
    {
      name: "Reminders",
      icon: <Bell />,
      active: filter?.reminder,
      onClick: () => NoteService.filter({ reminder: true }, true),
    },
    {
      name: "Tasks",
      icon: <CheckSquare />,
      active: filter?.task,
      onClick: () => NoteService.filter({ task: true }, true),
    },
    {
      name: "Favorites",
      icon: <Heart />,
      active: filter?.favorite,
      onClick: () => NoteService.filter({ favorite: true }, true),
    },
    { name: "Hightlights" },
  ];

  const onNewEntry = (value) => {
    TagService.create(value);
  };

  return (
    <div className="flex flex-col h-full">
      <div className={styles.sidebar}>
        <nav>
          <Section>
            <SectionTitle title="Quick Links" />
            <ul>
              {quickLinks.map((link) => (
                <QuickLink
                  content={link}
                  key={link.name}
                  active={link.active}
                  onClick={link.onClick}
                />
              ))}
            </ul>
          </Section>
          <Section>
            <SectionTitle title="Tags" onNewEntry={onNewEntry} />
            {tagsStatus == NetworkStates.FETCH ? (
              <Spinner />
            ) : (
              <ul>
                {tags.map((link) => (
                  <QuickLink
                    content={link}
                    key={link.id}
                    onClick={() => NoteService.filter({ tag: link.id }, true)}
                    active={filter.tag && filter.tag == link.id}
                    actions={[
                      {
                        label: "Delete",
                        onClick: () => TagService.delete(link.id),
                        icon: <FaTimes />,
                      },
                    ]}
                  />
                ))}
              </ul>
            )}
          </Section>
        </nav>
      </div>
      <div className="py-1 flex flex-row justify-center items-center mx-2">
        <div className="w-10 h-10 rounded-full bg-green-400 text-[#fff] flex flex-row justify-center items-center">
          UN
        </div>
        <div className="h-full flex-1 flex flex-col ml-2">
          <span className="block text-[#fff]">User Name</span>
          <Link href="/auth/logout">
            <a className="block text-[#fff] text-opacity-60">Logout</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
